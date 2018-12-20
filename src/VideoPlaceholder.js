import React from "react";
import "./VideoPlaceholder.scss";

const VideoPlaceholder = props => {
  if (props.apiConnectionSuccess) {
    return (
      <img
        className="video__placeholder"
        alt="video placeholder"
        src={props.videoThumbnail}
      />
    );
  } else {
    return (
      <img
        className="video__placeholder"
        alt="video placeholder"
        src="../images/videoPlaceholder.gif"
      />
    );
  }
};

export default VideoPlaceholder;
