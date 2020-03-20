var fs = require("fs");
var path = require("path");
var handlebars = require("handlebars");
var nw = require('nightwatch')

module.exports = {
  write: function(results, options, done) {
    function formatted_date() {
      var dataTeste = "";
      var d = new Date();
      dataTeste +=
        d.getFullYear() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getDate() +
        " " +
        (d.getHours()) +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return dataTeste;
    }

    var reportFilename = options.filename_prefix + Math.floor(Date.now() / 1000) + ".html";

    var reportFilePath = path.join(
      __dirname,
      options.output_folder,
      reportFilename
    );

    // read the html template
    fs.readFile("html-reporter.hbs", function(err, data) {
      if (err) throw err;

      var template = data.toString();

      // contabilizando o total de suites executadas
      var total = 0;
      for (let i in results.modules) {
        if (results.modules.hasOwnProperty(i)) {
          total++;
        }
      }

      console.log("==>", results.modules.key);

      // merge the template with the test results data
      var html = handlebars.compile(template)({
        results: results,
        total: total,
        options: options,
        timestamp: formatted_date().toString(),
        browser: options.filename_prefix.split("_").join(" ")
      });

      // write the html to a file
      fs.writeFile(reportFilePath, html, function(err) {
        if (err) throw err;
        console.log("Report generated: " + reportFilePath);
        done();
      });
    });
  }
};
