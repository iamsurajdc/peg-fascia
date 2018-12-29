import React, { Component } from "react";
import Header from "./Header";
import VideoPreview from "./VideoPreview";
import QuickStats from "./QuickStats";
import "./App.scss";

const API = "http://localhost:3030/videos";

const millisecondsToDays = milliseconds => milliseconds / (1000 * 60 * 60 * 24);
const sum = (total, amount) => total + amount;
const differenceBetween = (a, b) => Math.abs(a - b);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      highlightedVideo: null,
      displayVideo: false
    };

    this.loadVideo = this.loadVideo.bind(this);
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

  getUploadIntervals(collection) {
    let limit = collection.length - 1;
    let intervalsAsDays = [];

    for (let i = 0; i <= limit; i++) {
      if (i < limit) {
        let upload_a = collection[i];
        let upload_b = collection[i + 1];
        let timeDifference = differenceBetween(upload_a, upload_b);
        let days = millisecondsToDays(timeDifference);
        intervalsAsDays.push(days);
      }
    }
    return intervalsAsDays;
  }

  averageTimeBetweenUploads() {
    const timestamps = this.state.items
      .sort((a, b) => Date.parse(a.published_at) - Date.parse(b.published_at))
      .map(item => Date.parse(item.published_at));

    const intervals = this.getUploadIntervals(timestamps);

    const total = intervals.reduce(sum, 0);
    return (total / 11).toFixed(1);
  }

  collectedLikes(videos) {
    const sum = (total, video) => {
      return total + video.likes;
    };
    return videos.reduce(sum, 0);
  }

  sumValues(collection, property) {
    return collection.reduce((total, element) => {
      return (total += element[property]);
    }, 0);
  }

  percentage(numerator, denominator) {
    return (numerator / denominator) * 100;
  }

  collectedLikesVsDislikesPercentage(videos) {
    let likesAcrossAllVideos = this.sumValues(videos, "likes");
    let dislikesAcrossAllVideos = this.sumValues(videos, "dislikes");
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
    let mostLikedVideo;
    videos.forEach(video => {
      if (
        !mostLikedVideo ||
        mostLikedVideo.likesPercentage < video.likesPercentage
      ) {
        mostLikedVideo = video;
      }
    });
    this.setState({
      highlightedVideo: mostLikedVideo
    });
  }

  getTotalVideos() {
    return this.state.items.length;
  }

  buildVideoLink(videoID) {
    return "https://www.youtube.com/embed/" + videoID + "?modestbranding=1";
  }

  loadVideo() {
    if (this.state.isLoaded) {
      this.setState({ displayVideo: true });
    }
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
    let displayVideo = this.state.displayVideo;

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

      videoContent = (
        <VideoPreview
          videoTitle={mostLikedVideoTitle}
          videoLink={mostLikedVideoLink}
          videoThumbnail={mostLikedVideoThumbnail}
          apiConnectionSuccess={this.state.isLoaded}
          displayVideo={displayVideo}
        />
      );
    } else {
      creatorName = "~";
      mostLikedVideoTitle = "~";
      mostLikedVideoLink = "#";
      totalVideoCount = "~";
      averageLikesPerVideo = "~";
      totalViewsToDate = "~";
      averageUploadInterval = "~";

      videoContent = (
        <VideoPreview
          apiConnectionSuccess={this.state.isLoaded}
          displayVideo={displayVideo}
        />
      );
    }
    return (
      <div className="App">
        <Header creatorName={creatorName} />
        <section className="video" onClick={this.loadVideo}>
          {videoContent}
        </section>
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
