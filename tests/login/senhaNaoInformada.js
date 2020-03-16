module.exports = {
  // '@disabled': true,

  "senha nao informada": browser => {
    let pgLogin = browser.page.login();
    pgLogin
      .using("email@email.com", "")
      .expectAlertInfo("Opps. Cadê a senha?")
  }
};
