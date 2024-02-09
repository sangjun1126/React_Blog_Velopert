import esmRequire from 'esm';

const require = esmRequire(import.meta.url);

const main = await import('./main.js');
module.exports = main.default;
