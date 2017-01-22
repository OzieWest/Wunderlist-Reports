const argv = require('optimist').argv;

argv.f = argv.f || argv.filter;
argv.f = argv.f || [];
argv.f = typeof argv.f === 'string' ? [argv.f] : argv.f;
console.log('filter:', argv.f);

export function notExists(title: string) {
    return argv.f.indexOf(title) === -1;
}
