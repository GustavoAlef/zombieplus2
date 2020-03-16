import pg from '../../lib/db'
let movieData = {};

module.exports = {
  before: async browser => {
    movieData = {
      title: "Resident Evil",
      status: "Disponível",
      year: 2002,
      releaseDate: "01/05/2002",
      cast: ["Milla", "Ali", "Ian", "Shawn"],
      cover: "resident-evil-2002.jpg",
      plot: "A missao é desligar a rainha vermelha."
    };

    await pg.removeByTitle(movieData.title)

    let pgLogin = browser.page.login();
    let sidebar = browser.page.sidebar();

    pgLogin.using("karol@email.com", "asd");
    sidebar.expectLoggedUser("karol");
  },

  'quando eu faço o cadastro do filme': browser => {
    let pgmovie = browser.page.movie();

    pgmovie
    .goToForm()
    .setValue("@inputTitle", movieData.title)
    .selectStatus(movieData.status)
    .setValue("@inputAnoLanc", movieData.year)
    .setValue("@inputDataEstreia", movieData.releaseDate)
    .insertCast(movieData.cast)
    .setValue("@inputSinopse", movieData.plot)
    .uploadCover(movieData.cover)
    .pause(2000)
    .click("@btnCadastrar")
  },

  'entao eu devo ver o filme na lista': (browser) => {
    let pgmovie = browser.page.movie();

    pgmovie
    .waitForElementPresent('@listMovies', 6000)
    .assert.containsText('@listMovies', movieData.title)
  }
};
