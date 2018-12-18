import React from "react";
import "./QuickStats.scss";

const QuickStats = props => {
  return (
    <section className="quick-stats">
      <h2 className="quick-stats__title">Quick stats:</h2>
      <ul className="quick-stats__list">
        <li className="quick-stats__list--total-videos">
          NBA's total uploads:{" "}
          <span className="statistic">{props.videoCount} videos</span>
        </li>
        <li className="quick-stats__list--average-likes-per-video">
          Average likes per video:{" "}
          <span className="statistic">{props.averageLikesPerVideo}%</span>
        </li>
        <li className="quick-stats__list--views-to-date">
          Total views to date:{" "}
          <span className="statistic">{props.totalViewsToDate}</span>
        </li>
        <li className="quick-stats__list--new-content-release-average">
          NBA releases content on average:
          <span className="statistic">Every 0.5 days</span>
        </li>
      </ul>
    </section>
  );
};

export default QuickStats;
