module.exports = {
  beforeEach: function(browser, done) {
    browser.maximizeWindow();
    done();
  },
  afterEach: function(browser, done) {
    let shotpath = `./tests_output/screenshots/${browser.currentTest.name}.png`;
    // console.log(browser.currentTest.module);
    
    browser
      .saveScreenshot(shotpath, function() {
        const assertions = browser.currentTest.results.assertions || [];
        if (assertions.length > 0) {
          const currentAssertion = assertions[assertions.length - 1];
          if (currentAssertion) {
            currentAssertion.screenshots = currentAssertion.screenshots || [];
            currentAssertion.screenshots.push(shotpath); 
          }
        }
      })
      .end();
    done();
  }
};
