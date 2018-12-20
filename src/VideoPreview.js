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

    this.loadVideo = this.loadVideo.bind(this);
  }

  loadVideo() {
    this.setState({ displayVideo: true });
  }

  render() {
    let videoContent;

    if (this.state.displayVideo) {
      videoContent = (
        <iframe
          className="video__selected-video"
          title="Most popular video"
          width="560"
          height="315"
          src={this.props.videoLink}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      videoContent = (
        <img
          className="video__placeholder"
          alt="video placeholder"
          src={this.props.videoThumbnail}
        />
      );
    }
    return (
      <section className="video" onClick={this.loadVideo}>
        <div className="video__selected-video-container">
          {videoContent}
          <VideoInformation videoTitle={this.props.videoTitle} />
        </div>
      </section>
    );
  }
}

export default VideoPreview;
