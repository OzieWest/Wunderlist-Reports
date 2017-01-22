const fs = require('fs');
const path = require('path');
const swig = require('swig');
const mkdirp = require('mkdirp');
const moment = require('moment');

const TEMPLATE_DIRECTORY = process.env.WUNDER_TEMPLATE_DIR || path.resolve(__dirname, '../template');
const REPORT_DIRECTORY = process.env.WUNDER_REPORT_DIR || path.resolve(__dirname, '../report');

export function createReport(filename: string, data: any) {
    return new Promise((resolve, reject) => {
        const text = swig.renderFile(`${TEMPLATE_DIRECTORY}/${filename}.md`, { result: data });

        mkdirp(REPORT_DIRECTORY, (err) => {
            if (err) return reject(err);

            const name = `${REPORT_DIRECTORY}/${filename}-${moment().format('YYYY-MM-DD')}.md`;
            fs.writeFile(name, text, (err, result) => err ? reject(err) : resolve(result));
        });
    });
}