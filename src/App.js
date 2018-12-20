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
      items: [],
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
    return videos.reduce(sum, 0).toLocaleString();
  }

  sortByDate(videos) {
    return videos.sort(
      (a, b) => Date.parse(a.published_at) - Date.parse(b.published_at)
    );
  }

  dateSortedCopyOfItems(items) {
    // Creates a deep copy of the array (& contained objects)
    return JSON.parse(JSON.stringify(this.sortByDate(items)));
  }

  getUploadIntervals(collection) {
    let limit = collection.length - 1;
    let timestamps = [];

    for (let i = 0; i <= limit; i++) {
      if (i < limit) {
        let upload_a = Date.parse(collection[i].published_at);
        let upload_b = Date.parse(collection[i + 1].published_at);
        let timeDifference = this.differenceBetween(upload_a, upload_b);
        let days = this.millisecondsToDays(timeDifference);
        timestamps.push(days);
      }
    }
    return timestamps;
  }

  millisecondsToDays(milliseconds) {
    return milliseconds / (1000 * 60 * 60 * 24);
  }

  averageTimeBetweenUploads() {
    let orderedUploads = this.dateSortedCopyOfItems(this.state.items);
    let timestamps = this.getUploadIntervals(orderedUploads);

    const sum = (total, timestamp) => {
      return total + timestamp;
    };

    let total = timestamps.reduce(sum, 0);
    return (total / 11).toFixed(1);
  }

  differenceBetween(a, b) {
    return Math.abs(a - b);
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
    return allLikesPercentage.toFixed(1);
  }

  videoLikesVsDislikesPercentage(video) {
    let allInteractions = video.likes + video.dislikes;
    let likesPercentage = this.percentage(video.likes, allInteractions);
    video.likesPercentage = likesPercentage;
    return video;
  }

  setLikesPercentageForEachVideo(videos) {
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

  buildVideoLink(videoID) {
    return "https://www.youtube.com/embed/" + videoID + "?modestbranding=1";
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          items: this.setLikesPercentageForEachVideo(result),
          mostLikedVideo: this.getMostLikedVideo(result)
        });
      })
      .catch(error => {
        console.log("Error:", error);
        this.setState({
          isLoaded: false,
          error: error
        });
      });
  }

  render() {
    let creatorName;
    let mostLikedVideoTitle;
    let mostLikedVideoLink;
    let mostLikedVideoThumbnail;
    let videoContent;
    let totalVideoCount;
    let averageLikesPerVideo;
    let averageUploadInterval;
    let totalViewsToDate;

    if (this.state.isLoaded) {
      creatorName = this.getCreatorName();
      mostLikedVideoTitle = this.state.highlightedVideo.title;
      mostLikedVideoLink = this.buildVideoLink(
        this.state.highlightedVideo.link
      );
      mostLikedVideoThumbnail = this.state.highlightedVideo.thumbnail;
      totalVideoCount = this.getTotalVideos();
      averageLikesPerVideo = this.collectedLikesVsDislikesPercentage(
        this.state.items
      );
      totalViewsToDate = this.getTotalViewsToDate(this.state.items);
      averageUploadInterval = this.averageTimeBetweenUploads(this.state.items);
      // TODO: Go back to the two components of placeholder and player

      videoContent = (
        <VideoPreview
          videoTitle={mostLikedVideoTitle}
          videoLink={mostLikedVideoLink}
          videoThumbnail={mostLikedVideoThumbnail}
        />
      );
    } else {
      creatorName = "Still loading";
      mostLikedVideoTitle = "Still loading";
      mostLikedVideoLink = "#";
      mostLikedVideoThumbnail = "../images/videoPlaceholder.gif";
      totalVideoCount = "~";
      averageLikesPerVideo = "~";
      totalViewsToDate = "~";
      averageUploadInterval = "~";

      videoContent = <VideoPreview videoThumbnail={mostLikedVideoThumbnail} />;
    }
    return (
      <div className="App">
        <Header creatorName={creatorName} />
        {videoContent}
        <QuickStats
          creatorName={creatorName}
          videoCount={totalVideoCount}
          averageLikesPerVideo={averageLikesPerVideo}
          totalViewsToDate={totalViewsToDate}
          averageUploadInterval={averageUploadInterval}
        />
      </div>
    );
  }
}

export default App;
