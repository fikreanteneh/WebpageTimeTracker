import { Tracker } from "../types";
import LocalStorage from "./LocalStorage";
import {
  changeDateTimeToMinute,
  getDateToKey,
  isIgnoredUrl,
  retrieveTabInformation,
} from "./helper";

export default class Controller {
  private static instance: Controller;
  currStatus: { day: Tracker; week: Tracker; month: Tracker; year: Tracker } = {
    day: {},
    week: {},
    month: {},
    year: {},
  };
  currDay = [];
  currSite: string = "";
  currTime = Date.now();

  private constructor() {}

  static getInstance(): Controller {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  async loadData(): Promise<any> {
    const today = new Date();
    this.currDay = getDateToKey(today);
    this.currStatus = LocalStorage.getCurrentStatus();
  }

  async updateStaus(urls: { url: string; domain: string }): Promise<any> {
    const { url, domain } = urls;
    if (this.currSite === domain) return;
    if (isIgnoredUrl(this.currSite)) return;
    const minute = changeDateTimeToMinute(this.currTime, Date.now());
    this.currStatus.day.domain = (this.currStatus.day.domain ?? 0) + minute;
    this.currStatus.week.domain = (this.currStatus.week.domain ?? 0) + minute;
    this.currStatus.month.domain = (this.currStatus.month.domain ?? 0) + minute;
      this.currStatus.year.domain = (this.currStatus.year.domain ?? 0) + minute;
      
      await LocalStorage.
  }

  async changeStatus(tabId: number) {
    const { url, domain } = await retrieveTabInformation(tabId);
    await this.updateStaus({ url, domain });
    this.currSite = domain;
    this.currTime = Date.now();
  }

  async exitStaus(tabId: number) {
    const { url, domain } = await retrieveTabInformation(tabId);
    if (this.currSite === this.currSite) {
      await this.updateStaus({ url: "", domain: "" });
    }
    this.currSite = domain;
    this.currTime = Date.now();
  }
}
