import pg from '../../lib/db'
import faker from "faker"
let movieData = {};

module.exports = {
  '@tags': ['addmovie'],
  '@disabled': true,

  before: async browser => {
    faker.locale = "pt_BR"
    const title = faker.commerce.productName();
    const releaseDate = faker.date.between(2000, 2010);
    const plot = faker.lorem.sentence(5);
    
    movieData = {
      title,
      status: "Disponível",
      year: 2002,
      releaseDate,
      cast: ["Milla", "Ali", "Ian", "Shawn"],
      cover: "resident-evil-2002.jpg",
      plot
    };

    // await pg.removeByTitle(movieData.title)
    await pg.insertMovie(movieData)

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
