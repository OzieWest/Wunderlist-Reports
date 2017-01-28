const fs = require('fs');
const path = require('path');
const swig = require('swig');
const mkdirp = require('mkdirp');
const moment = require('moment');
import { Config } from './interfaces';

export class Reporter {

    constructor(private config: Config) {
    }

    async createReport(filename: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const startDate = this.config.startDate.format('YYYY-MM-DD');
            const endDate = this.config.endDate.format('YYYY-MM-DD');

            const text = swig.renderFile(`${this.config.templateDir}/${filename}.md`, { startDate, endDate, data });
            mkdirp(this.config.reportDir, (err) => {
                if (err) return reject(err);

                const name = `${this.config.reportDir}/${filename}-${startDate}-${endDate}.md`;
                fs.writeFile(name, text, (err, result) => err ? reject(err) : resolve(result));
            });
        });
    }
}
