import React, { Component } from "react";
import VideoInformation from "./VideoInformation";
import VideoPlaceholder from "./VideoPlaceholder";
import "./VideoPreview.scss";

class VideoPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayVideo: null
    };

    this.loadVideo = this.loadVideo.bind(this);
  }

  loadVideo() {
    if (this.props.apiConnectionSuccess) {
      this.setState({ displayVideo: true });
    }
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
        <VideoPlaceholder
          apiConnectionSuccess={this.props.apiConnectionSuccess}
          videoThumbnail={this.props.videoThumbnail}
        />
      );
    }
    return (
      <section className="video" onClick={this.loadVideo}>
        <div className="video__selected-video-container">
          {videoContent}
          <VideoInformation
            videoTitle={this.props.videoTitle}
            apiConnectionSuccess={this.props.apiConnectionSuccess}
          />
        </div>
      </section>
    );
  }
}

export default VideoPreview;
