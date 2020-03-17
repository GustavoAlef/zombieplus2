let loginActions = {
  using: function (email, senha) {
    return this
      .navigate()
      .waitForElementPresent("@formLogin", 10000)
      .setValue("@inputEmail", email)
      .setValue("@inputPass", senha)
      .click("@btnLogin")
      .pause(2000);
  },
  expectAlertDanger: function(texto){
      return this
      .waitForElementPresent("@alertDanger", 10000)
      .assert.containsText("@alertDanger", texto)
      .pause(1000);
  },
  expectAlertInfo: function(texto){
      return this
      .waitForElementPresent("@alertInfo", 10000)
      .assert.containsText("@alertInfo", texto)
      .pause(1000);
  }
};

module.exports = {
  url: "/login",
  commands:[loginActions],
  elements: {
    formLogin: ".card-login",
    inputEmail: "input#emailId",
    inputPass: "input#passId",
    btnLogin: "button.login-button",
    alertInfo: ".alert-info",
    alertDanger: ".alert-danger"
  }
};
