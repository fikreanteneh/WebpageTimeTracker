// Helper function to calculate the week number
const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getDateToKey = (date: Date = new Date()): string[] => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const week = getWeekNumber(date);
  const year = date.getFullYear();

  return [
    `${day}.${month}.${year}`,
    `${week}.${year}`,
    `${month}.${year}`,
    `${year}`,
  ];
};

export const isIgnoredUrl = (url: string): boolean => {
  return !url.startsWith("http:") && !url.startsWith("https:");
};

function extractDomain(url) {
  const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const matches = url.match(domainRegex);
  return matches ? matches[1] : null;
}

export async function retrieveTabInformation(tabId) {
  const tab = await chrome.tabs.get(tabId);
  console.log(tab);
  const url = tab.url;
  const domain = extractDomain(url);
  console.log(domain, url);
  return { url, domain };
}

export function changeDateTimeToMinute(time1: number, time2: number): number {
  const diffInMilliseconds = Math.abs(time2 - time1);
  const minutesDifference = Math.floor(diffInMilliseconds / (1000 * 60));
  return minutesDifference;
}
