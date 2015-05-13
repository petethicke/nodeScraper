var fs = require('fs');
var cheerio = require('cheerio') 
var request = require('request')
var path = require('path')


// GET Request
request("http://substack.net/images/", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('working');
    var $ = cheerio.load(body);
    $("tr").each(function(i, element) {
      var permission = $(this).children().first().text();
      var url = "http://substack.net/images" + $(this).find('a').attr('href');
      var type = path.extname(url);
      console.log("Permission: " + permission + ' || ' + "URL: " + url + ' || ' + "File Type: " + type);
    });
  } else {
    console.log('We have an error: ' + error);
  }
});
