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
      title: null
    };

    this.extractFirstTitle = this.extractFirstTitle.bind(this);
    this.likesVsDislikesPercentage = this.likesVsDislikesPercentage.bind(this);
    this.setLikesPercentage = this.setLikesPercentage.bind(this);
  }

  extractFirstTitle(array) {
    return array[0]["title"];
  }

  likesVsDislikesPercentage(video) {
    let allInteractions = video.likes + video.dislikes;
    let likesPercentage = (video.likes / allInteractions) * 100;
    let dislikesPercentage = (video.dislikes / allInteractions) * 100;
    let difference = Math.abs(likesPercentage - dislikesPercentage);
    video.likesPercentage = difference;
    return video;
  }

  setLikesPercentage(videos) {
    return videos.map(video => this.likesVsDislikesPercentage(video));
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: this.setLikesPercentage(result)
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
    return (
      <div className="App">
        <Header creatorName={"Something has gone wrong"} />
        <VideoPreview />
        <QuickStats />
      </div>
    );
  }
}

export default App;
