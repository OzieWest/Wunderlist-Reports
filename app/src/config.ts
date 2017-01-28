const fs = require('fs');
const path = require('path');
const moment = require('moment');

import { Config } from './interfaces';

export const filter = {
    blackList: function (argv: Config) {
        argv.blackList = argv.blackList || [];
        argv.blackList = typeof argv.blackList === 'string' ? [argv.blackList] : argv.blackList;
        return (title: string) => argv.blackList.indexOf(title) === -1;
    }
};

export async function getConfig(fileName: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
        fs.readFile(fileName, 'utf8', (err: Error, result: any) => {
            result = result || {};
            const config: Config = {
                wunderSecret: result.wunder_secret || process.env.WUNDER_SECRET,
                wunderId: result.wunder_id || process.env.WUNDER_ID,
                blackList: result.black_list,
                templateDir: result.template_dir || process.env.WUNDER_TEMPLATE_DIR || path.resolve(__dirname, '../template'),
                reportDir: result.report_dir || process.env.WUNDER_REPORT_DIR || path.resolve(__dirname, '../report'),
                concurrency: result.concurrency || process.env.WUNDER_CONCURRENCY || 1,
                startDate: parseDate(result.startDate || process.env.WUNDER_START_DATE),
                endDate: parseDate(result.endDate || process.env.WUNDER_END_DATE)
            };
            resolve(config);
        });
    });
}

function parseDate(dateString: string) {
    return moment(dateString).isValid() ? moment(dateString).startOf('day') : moment().startOf('day');
}