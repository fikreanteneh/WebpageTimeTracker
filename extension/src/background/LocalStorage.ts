import { Tracker } from "../types";
import { getDateToKey } from "./helper";

export default class LocalStorage {
  static getDayStatus(day: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([day], (result) => {
        resolve(result);
      });
    });
  }

  static getWeekStatus(week: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([week], (result) => {
        resolve(result);
      });
    });
  }

  static getMonthStatus(month: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([month], (result) => {
        resolve(result);
      });
    });
  }

  static getYearStatus(year: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get([year], (result) => {
        resolve(result);
      });
    });
  }

  static getCurrentStatus(curr: Date = new Date()): {
    day: Tracker;
    week: Tracker;
    month: Tracker;
    year: Tracker;
  } {
    const [day, week, month, year] = getDateToKey(curr);
    const currStaus = {
      day: this.getDayStatus(day) ?? {},
      week: this.getWeekStatus(week) ?? {},
      month: this.getMonthStatus(month) ?? {},
      year: this.getYearStatus(year) ?? {},
    };
    return currStaus;
  }


  static updateStatus(key: string, value: Tracker) {
    chrome.storage.local.set(key: value)
    
  }
}
