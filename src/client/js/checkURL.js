const validUrl = require('valid-url');

const isValidUrl = (url) => validUrl.isWebUri(url);

module.exports = {
  isValidUrl,
};