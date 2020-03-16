module.exports = {
  // '@disabled': true,

  "email nao informado": browser => {
    let pgLogin = browser.page.login();
    pgLogin
      .using("", "xxx")
      .expectAlertInfo("Opps. Cadê o email?")
  }
};
