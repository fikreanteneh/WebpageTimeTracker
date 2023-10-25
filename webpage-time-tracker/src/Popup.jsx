/* eslint-disable no-undef */
import React from "react";
import "./popup.css";
const Popup = () => {
  chrome.runtime.sendMessage({ action: "getStartTime" }, (response) => {
    let startTime = "Not Started";
    if (response && response.startTime) {
      console.log("popup");
      startTime = response.startTime;
    }
  });
  console.log("popup");
  console.log("chrome");

  return <div className="container">URL:{startTime} </div>;
};

export default Popup;
