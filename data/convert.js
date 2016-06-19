var X2JS = require('x2js');
var fs = require('fs');
var moment = require('moment');

var x2js = new X2JS();
var entries = [];
var pageSize = 10;
var days = ['friday', 'saturday', 'sunday'];
var dayVals = {
  'friday': 17,
  'saturday': 18,
  'sunday': 19
};

var formatEntries = function(data, day){
  return x2js.xml2js(data).viewentries.viewentry.map(function(item){
    if(!item.entrydata.length){console.log(item);}
    var parts = item.entrydata[0].text.substr(1).split('h');
    var time = moment({
      'date': dayVals[day], 'month': 5, 'year': 2016,
      'hour': parts[0], 'minute': parts[1]
    });
    if(time.hour() < 4) {
      time.add(1, 'days');
    }
    return {
      day: day,
      time: time,
      act: item.entrydata[1].text,
      stage: item.entrydata[2].text,
      genre: item.entrydata[3].text
    };
  });
};

days.forEach(function(day){
  fs.readFile('data/'+ day +'.xml', {encoding: 'utf8'}, function(err, data){
    if(err) {
      console.error(err);
    }
    fs.writeFile('data/'+ day +'.json', JSON.stringify(formatEntries(data, day)));
  })
})
