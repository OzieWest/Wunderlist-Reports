import { Reporter } from "./report";
import { Utils } from "./utils";
import { filter, getConfig } from "./config";
import { WunderClient } from "./wunder";
import { Config, WunderList } from './interfaces';

(async () => {
  try {
    const config: Config = await getConfig('./config.json');
    console.log('Configuration:', JSON.stringify(config));

    const client = new WunderClient(config);

    const blacklist = filter.blackList(config);
    const response: Array<WunderList> = await client.getListsAll();

    const result = {};

    const tasks: Array<Function> = response
      .filter(item => blacklist(item.title))
      .map(list => client.getTasksByListId(result, list, true));

    await Utils.run(tasks, config.concurrency);

    const reporter = new Reporter(config);
    await reporter.createReport('report', Utils.group(result));

    Utils.exit();
  } catch (e) {
    Utils.onError(e);
  }
})();
