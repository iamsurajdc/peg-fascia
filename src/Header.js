import React from "react";
import "./Header.scss";

const Header = props => {
  return (
    <header className="creator-information">
      <h1 className="creator-information__name">{props.creatorName}</h1>
    </header>
  );
};

export default Header;
