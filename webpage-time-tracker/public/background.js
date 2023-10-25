/* eslint-disable no-undef */
// background.js
let startTime;

chrome.runtime.onStartup.addListener(() => {
  startTime = Date.now();
  console.log(startTime);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message && message.action === "getTotalTime") {
    const totalTime = Date.now() - startTime;
    sendResponse({ totalTime });
  } else if (message && message.action === "getStartTime") {
    console.log("reached Here");
    sendResponse({ startTime: 1000 });
  }
});
let curr = "";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;
  const { url, domain } = await retrieveTabInformation(tabId);
  if (curr !== domain) {
    console.log(`Active tab changed. Tab ID: ${tabId}`);
    console.log(`Current URL: ${url}`);
    console.log(`Domain: ${domain}`);
  }
  curr = domain;
});

chrome.tabs.onUpdated.addListener( async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    const { url, domain } = await retrieveTabInformation(tabId);
    if (curr !== domain) {
      console.log(`Tab updated. Tab ID: ${tabId}`);
      console.log(`Current URL: ${url}`);
      console.log(`Domain: ${domain}`);
    }
    curr = domain;
  }
});

async function retrieveTabInformation(tabId) {
  const tab = await chrome.tabs.get(tabId);
  console.log(tab)
  const url = tab.url;
  const domain = extractDomain(url);
  console.log(domain, url);
  return { url, domain };
}

function extractDomain(url) {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = url.match(domainRegex);
  return matches ? matches[1] : null;
}
