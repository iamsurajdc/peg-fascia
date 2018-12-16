import React, { Component } from "react";
import Header from "./Header";
import VideoPreview from "./VideoPreview";
import QuickStats from "./QuickStats";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header creatorName="NBA" />
        <VideoPreview />
        <QuickStats />
      </div>
    );
  }
}

export default App;
