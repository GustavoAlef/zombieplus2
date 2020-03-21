import pg from "../../lib/db";
let movieData = {}

module.exports = {
// '@disabled': true,
'@tags': ["busca"],

  before: async browser => {
    movieData = {
      title: "Meu namorado é um zumbi",
      status: "Disponível",
      year: 2013,
      releaseDate: "01/05/2013",
      cast: ["Nicholas", "Teresa", "A. Tipton", "Rob"],
      cover: "meu-namo-zumbi.jpg",
      plot: "Um filme onde um zumbi se apaixona por uma humana."
    };

    await pg.removeByTitle(movieData.title).then(() => {
      pg.insertMovie(movieData);
    }).catch( err => err.stack);

    let pgLogin = browser.page.login();
    let sidebar = browser.page.sidebar();

    pgLogin.using("karol@email.com", "asd");
    sidebar.expectLoggedUser("karol");
  },

  "quando eu faço a busca pelo título": browser => {
      let pgmovie = browser.page.movie();
      pgmovie
      .setValue('@inputSearch', movieData.title)
      .click('@iconSearch')
  },

  "entao o titulo deve ser exibido na lista": browser => {
    let pgmovie = browser.page.movie();
    pgmovie
    .waitForElementPresent('@tableRow', 5000)
    .assert.containsText('@tableRow',movieData.title)
  }
};
