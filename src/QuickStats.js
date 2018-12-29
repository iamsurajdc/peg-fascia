import React from "react";
import "./QuickStats.scss";

const Stat = ({ title, value }) => {
  return (
    <li className="quick-stats__list-item">
      {title}
      <span className="statistic">{value}</span>
    </li>
  );
};

const QuickStats = props => {
  const stats = [
    {
      title: `${props.creatorName}'s total uploads:`,
      value: `${props.videoCount} videos`
    },
    {
      title: `Average likes (vs dislikes) per video:`,
      value: `${props.averageLikesPerVideo}%`
    },
    {
      title: `Total video views to date:`,
      value: props.totalViewsToDate
    },
    {
      title: `${props.creatorName} releases content on average:`,
      value: `Every ${props.averageUploadInterval} days`
    }
  ];

  return (
    <section className="quick-stats">
      <h2 className="quick-stats__title">Quick stats:</h2>
      <ul className="quick-stats__list">
        {stats.map(({ title, value }, index) => (
          <Stat key={index} title={title} value={value} />
        ))}
      </ul>
    </section>
  );
};

export default QuickStats;
