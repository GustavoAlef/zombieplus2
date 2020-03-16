module.exports = {
  beforeEach: function(browser, done) {
    browser.maximizeWindow();
    done();
  },
  afterEach: function(browser, done) {
    browser.end();
    done();
  }
};
