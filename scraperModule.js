var cheerio = require('cheerio') 
var request = require('request')
var path = require('path')
var csv = require('fast-csv')
var fs = require('fs')
// var permission = [];
// var url = [];
// var type = [];
// var finalString;

var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream("data.csv");
 
writableStream.on("finish", function(){
  console.log("DONE!");
});

// GET Request and use fast-csv to write to file
request("http://substack.net/images/", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log('working');
    var $ = cheerio.load(body);
    csvStream.pipe(writableStream);
    $("tr").each(function(i, element) {
      permission = $(this).children().first().text();
      url = "http://substack.net/images" + $(this).find('a').attr('href');
      type = path.extname(url);
      //console.log("Permission: " + permission + ' || ' + "URL: " + url + ' || ' + "File Type: " + type); 
      finalString = [permission, url, type];
      csvStream.write(finalString);
    });
    csvStream.end();
  } else {
    console.log('We have an error: ' + error);
  }
  
});


