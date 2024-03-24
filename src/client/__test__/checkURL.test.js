// checkURL.test.js
const { isValidUrl } = require('../js/checkURL');

describe('isValidUrl', () => {
  test('valid URL should return true', () => {
    const url = 'https://example.com';
    expect(isValidUrl(url)).toBeTruthy();
  });

  test('invalid URL should return false', () => {
    const url = 'invalid-url';
    expect(isValidUrl(url)).toBeFalsy();
  });

  test('valid email should return false', () => {
    const email = 'user@example.com';
    expect(isValidUrl(email)).toBeFalsy();
  });

  test('empty string should return false', () => {
    const emptyString = '';
    expect(isValidUrl(emptyString)).toBeFalsy();
  });
});