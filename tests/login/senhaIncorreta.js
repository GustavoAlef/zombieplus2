module.exports = {
  // '@disabled': true,

  "senha incorreta": browser => {
    let pgLogin = browser.page.login();
    pgLogin
      .using("karol@email.com", "xxx")
      .expectAlertDanger("Usuário e/ou senha inválidos")
  }
};
