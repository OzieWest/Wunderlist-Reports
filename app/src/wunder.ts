const moment = require('moment');
const WunderlistSDK = require('wunderlist');
const wunderlistAPI = new WunderlistSDK({
  accessToken: process.env.WUNDER_SECRET,
  clientID: process.env.WUNDER_ID
});

export function getTasksByListId(summ: any, list: WunderList, completed?: boolean) {
  return () => {
    return new Promise((resolve, reject) => {
      wunderlistAPI.http.tasks.forList(list.id, completed)
        .done((data: Array<WunderItem>) => {
          const start = moment().startOf('isoWeek');
          data.filter(item => !item.recurrence_type && start < moment(item.completed_at)).forEach(item => {
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

export function getListsAll() {
  return new Promise((resolve, reject) => wunderlistAPI.http.lists.all().done(resolve).fail(reject));
}

export interface WunderList {
  id: number;
  title: string;
  owner_type: string;
  owner_id: number;
  list_type: string;
  public: boolean;
  revision: number;
  created_at: Date;
  type: string;
}

export interface WunderItem {
  id: number;
  created_at: Date;
  created_by_id: number;
  created_by_request_id: string;
  recurrence_type: string;
  recurrence_count: number;
  due_date: string;
  completed: boolean;
  completed_at: Date;
  completed_by_id: number;
  starred: boolean;
  list_id: number;
  revision: number;
  title: string;
  type: string;
  hours: number;
  list: string;
}