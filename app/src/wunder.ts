const moment = require('moment');
const WunderlistSDK = require('wunderlist');
import { Config, WunderItem, WunderList } from './interfaces';

export class WunderClient {
  client: any = null;

  constructor(private config: Config) {
    this.client = new WunderlistSDK({
      accessToken: config.wunderSecret,
      clientID: config.wunderId
    });
  }

  getTasksByListId(summ: any, list: WunderList, completed?: boolean): Function {
    return () => {
      return new Promise((resolve, reject) => {
        this.client.http.tasks.forList(list.id, completed)
          .done((data: Array<WunderItem>) => {
            const start = this.config.startDate;
            const end = this.config.endDate;

            data
              .filter(item => {
                const current = moment(item.completed_at)
                return !item.recurrence_type && start < current && end > current;
              })
              .forEach(item => {
                const hours = moment(item.created_at).diff(item.completed_at, 'hours');
                item.hours = hours < 0 ? hours * -1 : hours;
                item.list = list.title;

                summ[list.title] = summ[list.title] || [];
                summ[list.title].push(item);
              });
              
            resolve(data);
          })
          .fail(reject);
      })
    }
  }

  async getListsAll(): Promise<any> {
    return new Promise((resolve, reject) => this.client.http.lists.all().done(resolve).fail(reject));
  }
}