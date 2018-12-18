import React, { Component } from "react";
import Header from "./Header";
import VideoPreview from "./VideoPreview";
import QuickStats from "./QuickStats";
import "./App.scss";

const API = "http://localhost:3030/videos";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      highlightedVideo: null
    };
  }

  getCreatorName() {
    return this.state.highlightedVideo.title.split("| ")[1];
  }

  getTotalViewsToDate(videos) {
    const sum = (total, video) => {
      return total + video.views;
    };
    return videos.reduce(sum, 0);
  }

  collectedLikes(videos) {
    const sum = (total, video) => {
      return total + video.likes;
    };
    return videos.reduce(sum, 0);
  }

  collectedDislikes(videos) {
    const sum = (total, video) => {
      return total + video.dislikes;
    };
    return videos.reduce(sum, 0);
  }

  percentage(numerator, denominator) {
    return (numerator / denominator) * 100;
  }

  collectedLikesVsDislikesPercentage(videos) {
    let likesAcrossAllVideos = this.collectedLikes(videos);
    let dislikesAcrossAllVideos = this.collectedDislikes(videos);
    let allInteractions = likesAcrossAllVideos + dislikesAcrossAllVideos;
    let allLikesPercentage = this.percentage(
      likesAcrossAllVideos,
      allInteractions
    );
    let allDislikesPercentage = this.percentage(
      dislikesAcrossAllVideos,
      allInteractions
    );
    let difference = Math.abs(allLikesPercentage - allDislikesPercentage);
    return difference.toFixed(1);
  }

  videoLikesVsDislikesPercentage(video) {
    let allInteractions = video.likes + video.dislikes;
    let likesPercentage = this.percentage(video.likes, allInteractions);
    let dislikesPercentage = this.percentage(video.dislikes, allInteractions);

    let difference = Math.abs(likesPercentage - dislikesPercentage);
    video.likesPercentage = difference;
    return video;
  }

  setLikesPercentage(videos) {
    return videos.map(video => this.videoLikesVsDislikesPercentage(video));
  }

  getMostLikedVideo(videos) {
    let mostLikedVideo = null;
    Math.max.apply(
      Math,
      videos.map(function(video) {
        return (mostLikedVideo = video.likesPercentage);
      })
    );
    this.setState({
      highlightedVideo: videos.find(
        video => video.likesPercentage === mostLikedVideo
      )
    });
  }

  getTotalVideos() {
    return this.state.items.length;
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: this.setLikesPercentage(result),
            mostLikedVideo: this.getMostLikedVideo(result)
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    let creatorName;
    let mostLikedVideoTitle;
    let mostLikedVideoLink;
    let mostLikedVideoThumbnail;
    let videoContent;
    let totalVideoCount;
    let averageLikesPerVideo;
    let totalViewsToDate;

    if (!this.state.isLoaded) {
      creatorName = "Still loading";
      mostLikedVideoTitle = "Still loading";
      mostLikedVideoLink = "#";
      mostLikedVideoThumbnail = "#";
      totalVideoCount = "~";
      averageLikesPerVideo = "~";
      totalViewsToDate = "~";
    } else {
      creatorName = this.getCreatorName();
      mostLikedVideoTitle = this.state.highlightedVideo.title;
      mostLikedVideoLink = this.state.highlightedVideo.link;
      mostLikedVideoThumbnail = this.state.highlightedVideo.thumbnail;
      totalVideoCount = this.getTotalVideos();
      averageLikesPerVideo = this.collectedLikesVsDislikesPercentage(
        this.state.items
      );
      totalViewsToDate = this.getTotalViewsToDate(this.state.items);

      videoContent = (
        <VideoPreview
          videoTitle={mostLikedVideoTitle}
          videoLink={mostLikedVideoLink}
          videoThumbnail={mostLikedVideoThumbnail}
        />
      );
    }

    return (
      <div className="App">
        <Header creatorName={creatorName} />
        {videoContent}
        <QuickStats
          videoCount={totalVideoCount}
          averageLikesPerVideo={averageLikesPerVideo}
          totalViewsToDate={totalViewsToDate}
        />
      </div>
    );
  }
}

export default App;
