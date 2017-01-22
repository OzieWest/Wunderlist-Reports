import { createReport } from "./report";
import { pool, group, exit, onError } from "./utils";
import { notExists } from "./filter";
import { getListsAll, getTasksByListId, WunderItem, WunderList } from "./wunder";

const tasks: Array<Function> = [];
const result = {};

getListsAll()
  .then((response: Array<WunderList>) => {
    response
      .filter(item => notExists(item.title))
      .forEach(list => tasks.push(getTasksByListId(result, list, true)));

    return pool(tasks);
  })
  .then(() => createReport('weekly', group(result)))
  .then(exit)
  .catch(onError);
