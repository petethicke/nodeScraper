var cheerio = require('cheerio') 
var request = require('request')
var url = "http://substack.net/images/"

request(url, function (error, response, body) {
  if (!error) {
    console.log('success!');
  } else {
    console.log('We have an error: ' + error);
  }
});
