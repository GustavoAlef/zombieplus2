let actions = {
  goToForm: function(){
      return this
    .click("@btnAdd")
    .waitForElementPresent("@formMovie", 10000)
    },

  selectStatus: function(status) {
    return this
    .click("@selectStatus")
    .useXpath()
    .waitForElementPresent(`//li//span[contains(text(), 
    "${status}")]`, 10000)
      .click(`//li//span[contains(text(), 
    "${status}")]`)
    .useCss();
  },

  insertCast: function(cast){
      const browser = this

      cast.forEach(function(ator){
          browser
          .setValue("@inputCast", ator)
          .api.keys(browser.api.Keys.TAB)
      })

      return this
  },

  uploadCover: function(filename){
    //busca o path da imagem desejada  
    let fullPath = require('path').resolve(__dirname, '../images/' + filename)

    return this.setValue('@btnInputCover', fullPath)
  }
};

module.exports = {
  commands:[actions],
    elements: {
    btnAdd: "button.movie-add",
    inputSearch: "input[placeholder^=Pesquisar]",
    iconSearch: "#search-movie",
    alertDanger: '.alert-danger',
    formMovie: "#movie-form",
    inputTitle: "input[name='title']",
    selectStatus: "input[placeholder=Status]",
    inputAnoLanc: "input[name='year']",
    inputDataEstreia: "input[name='release_date']",
    inputCast: ".input-new-tag",
    inputSinopse: "textarea[name='overview']",
    btnInputCover: "input#upcover",
    btnCadastrar: "button#create-movie",
    listMovies: 'table tbody',
    tableRow: 'table tbody tr'
  }
};
