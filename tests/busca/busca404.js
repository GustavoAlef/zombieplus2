module.exports = {
  "@tags": ["404"],

  before: browser => {
    let pgLogin = browser.page.login();
    let sidebar = browser.page.sidebar();

    pgLogin.using("karol@email.com", "asd");
    // sidebar.expectLoggedUser("karol");
  },

  "quando eu busco um titulo nao cadastrado": browser => {
    let pgmovie = browser.page.movie();

    pgmovie
      .setValue("@inputSearch", "minha mae é uma peça")
      .click("@iconSearch");
  },

  "entao eu devo ver uma mensagem de alerta": browser => {
    let pgmovie = browser.page.movie();

    pgmovie
      .waitForElementPresent("@alertDanger", 5000)
      .assert.containsText(
        "@alertDanger",
        "Puxa! não encontramos nada aqui :("
      );
  }
};
