var fs = require('fs');
var cheerio = require('cheerio') 
var request = require('request')


// GET Request
request("http://substack.net/images/", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('working');
    var $ = cheerio.load(body);
    $("tr").each(function(i, element) {
      var permission = $(this).children().first().text();
      var url = "http://substack.net/images" + $(this).find('a').attr('href');
      console.log("Permission: " + permission + ' || ' + "URL: " + url);
    });
  } else {
    console.log('We have an error: ' + error);
  }
});
