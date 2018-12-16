import React from "react";
import "./VideoPreview.scss";

const VideoPreview = props => {
  return (
    <section className="video-preview">
      <div className="video-preview__selected-video-container">
        <iframe
          className="video-preview__selected-video"
          title="Most popular video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-olhd3oG3lI?modestbranding=1"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-preview__information">
          <h3 className="video-preview__section-title">Most liked video:</h3>
          <p className="video-preview__selected-video-title">
            James Harden's 60-Point Triple-Double (First in NBA History) |
            January 30, 2018
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
