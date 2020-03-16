module.exports = {
  // "@disabled": true,
  '@tags': ["login"],

  "login com sucesso": browser => {
    let pgLogin = browser.page.login();
    let sidebar = browser.page.sidebar();

    pgLogin.using("karol@email.com", "asd");

    sidebar.expectLoggedUser("karol");
  }
};
