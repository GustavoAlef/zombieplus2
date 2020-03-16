module.exports = {
  // '@disabled': true,

  "user nao cadastrado": browser => {
    let pgLogin = browser.page.login();
    pgLogin
      .using("email@email.com", "xxx")
      .expectAlertDanger("Usuário e/ou senha inválidos")
  }
};
