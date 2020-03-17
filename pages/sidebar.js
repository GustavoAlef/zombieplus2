let userActions = {
  expectLoggedUser: function(nome) {
    return this
    .waitForElementVisible("@userInfo", 10000)
    .assert.containsText("@userInfo", nome);
  }
};

module.exports = {
  commands: [userActions],
  elements: {
    userInfo: ".info span"
  }
};
