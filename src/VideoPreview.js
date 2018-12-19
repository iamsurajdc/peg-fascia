import React, { Component } from "react";
import VideoInformation from "./VideoInformation";
import "./VideoPreview.scss";

// Make sure there are placeholders for pre-loading

// Try and move the state out from this child to App.js
class VideoPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayVideo: null
    };

    this.buildVideoLink = this.buildVideoLink.bind(this);
    this.loadVideo = this.loadVideo.bind(this);
  }

  buildVideoLink(videoID) {
    return "https://www.youtube.com/embed/" + videoID + "?modestbranding=1";
  }

  loadVideo() {
    this.setState({ displayVideo: true });
  }

  render() {
    let videoContent;

    if (this.state.displayVideo) {
      videoContent = (
        <div className="video__selected-video-container">
          <iframe
            className="video__selected-video"
            title="Most popular video"
            width="560"
            height="315"
            src={this.buildVideoLink(this.props.videoLink)}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <VideoInformation videoTitle={this.props.videoTitle} />
        </div>
      );
    } else {
      videoContent = (
        <div className="video__selected-video-container">
          <img
            className="video__placeholder"
            alt="video placeholder"
            src={this.props.videoThumbnail}
          />
          <VideoInformation videoTitle={this.props.videoTitle} />
        </div>
      );
    }
    return (
      <section className="video" onClick={this.loadVideo}>
        {videoContent}
      </section>
    );
  }
}

export default VideoPreview;
