/* eslint-disable no-undef */
// background.js
import Controller from "./Controller";

let controller = Controller.getInstance();

chrome.runtime.onInstalled.addListener(async () => {
  controller = Controller.getInstance();
  await controller.loadData();
});

chrome.runtime.onStartup.addListener(async () => {
  controller = Controller.getInstance();
  await controller.loadData();
  console.log(controller.changeStatus);
});

// chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
//   await controller.changeStatus(tabId);
// });

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;
  await controller.changeStatus(tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    await controller.changeStatus(tabId);
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (!message) sendResponse({ error: true });
  // switch (message?.action) {
  //   case "getUser":
  //     sendResponse({ response: await AuthClass.getUser() });
  //     break;
  //   case "signIn":
  //     await AuthClass.signIn();
  //     sendResponse({ response: await AuthClass.getUser() });
  //     break;
  //   case "signOut":
  //     await AuthClass.signOut();
  //     sendResponse({ response: await AuthClass.getUser() });
  //     break;
  //   case "getTotalTime":
  //     sendResponse({ totalTime: 10 });
  //     break;
  //   case "getStartTime":
  //     console.log("reached Here");
  //     sendResponse({ startTime: 1000 });
  //     break;
  //   default:
  //     // Handle other cases or provide a default response
  //     break;
  // }
});
