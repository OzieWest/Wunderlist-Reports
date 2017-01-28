const PromisePool = require('es6-promise-pool');

export class Utils {

    static async run(tasks: Array<Function>, CONCURRENCY: number): Promise<any> {
        return new PromisePool(() => {
            const fn = tasks.pop()
            return fn ? fn() : null;
        }, CONCURRENCY).start();
    }

    static group(result: any) {
        const data = [];
        Object.keys(result).forEach(key => data.push(result[key]));
        return data;
    }

    static exit() {
        console.log('done');
        process.exit();
    }

    static onError(error: Error) {
        console.error('Error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        process.exit();
    }
}