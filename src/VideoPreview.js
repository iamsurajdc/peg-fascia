import React, { Component } from "react";
import VideoInformation from "./VideoInformation";
import VideoPlaceholder from "./VideoPlaceholder";
import "./VideoPreview.scss";

const VideoPreview = props => {
  if (props.displayVideo) {
    return (
      <div className="video__selected-video-container">
        <iframe
          className="video__selected-video"
          title="Most popular video"
          width="560"
          height="315"
          src={props.videoLink}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <VideoInformation
          videoTitle={props.videoTitle}
          apiConnectionSuccess={props.apiConnectionSuccess}
        />
      </div>
    );
  } else {
    return (
      <div className="video__selected-video-container">
        <VideoPlaceholder
          apiConnectionSuccess={props.apiConnectionSuccess}
          videoThumbnail={props.videoThumbnail}
        />
        <VideoInformation
          videoTitle={props.videoTitle}
          apiConnectionSuccess={props.apiConnectionSuccess}
        />
      </div>
    );
  }
};

export default VideoPreview;
