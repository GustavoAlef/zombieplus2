let userActions = {
  expectLoggedUser: function(nome) {
    return this
    .waitForElementVisible("@userInfo", 3000)
    .assert.containsText("@userInfo", nome);
  }
};

module.exports = {
  commands: [userActions],
  elements: {
    userInfo: ".info span"
  }
};
