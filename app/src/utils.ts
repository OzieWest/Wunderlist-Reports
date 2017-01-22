const PromisePool = require('es6-promise-pool');
const CONCURRENCY = process.env.WUNDER_CONCURRENCY || 1;

export function pool(tasks) {
    return new PromisePool(() => {
        const fn = tasks.pop()
        return fn ? fn() : null;
    }, CONCURRENCY).start();
}

export function group(result: any) {
    const data = [];
    Object.keys(result).forEach(key => data.push(result[key]));
    return data;
}

export function exit() {
    console.log('done');
    process.exit();
}

export function onError(error: Error) {
    console.error('Error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    process.exit();
}