const { JSDOM } = require('jsdom');

const jsdomConfig = {
  url: 'http://localhost',
  runScripts: 'dangerously',
};

const { window } = new JSDOM(undefined, jsdomConfig);

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};