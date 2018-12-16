import React, { Component } from "react";
import "./VideoPreview.scss";

const VideoPreview = props => {
  return (
    <section class="video-preview">
      <div class="video-preview__selected-video-container">
        <iframe
          class="video-preview__selected-video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-olhd3oG3lI"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <div class="video-preview__information">
          <h3 class="video-preview__section-title">Most liked video:</h3>
          <p class="video-preview__selected-video-title">
            James Harden's 60-Point Triple-Double (First in NBA History) |
            January 30, 2018
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
