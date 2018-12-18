import React from "react";
import "./VideoInformation.scss";

const VideoInformation = props => {
  return (
    <div className="video-information">
      <h3 className="video-information__section-title">Most liked video:</h3>
      <p className="video-information__selected-video-title">
        {props.videoTitle}
      </p>
    </div>
  );
};

export default VideoInformation;
