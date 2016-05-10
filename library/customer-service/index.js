var moment = require('moment');

module.exports = {
  getTodayCs: getTodayCs,
  getTomorrowCs: getTomorrowCs,
};

var startingDate = moment('2016-05-10 +0700', 'YYYY-MM-DD ZZ'),
    people = [
      'darwin.gautalius',
      'stevenihan',
      'ahayamb',
      'rizaanjariputri',
      'timothykevin',
      'yclarista',
      'eckyputrady',
      'ariza.ramaditia',
      'aditya',
      'jonathancesario',
      'dannych',
      'sindunuragarp'
    ];
     
function getTodayCs() {
  var now = moment(),
      diff = now.diff(startingDate,'days'),
      personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function getTomorrowCs() {
  var now = moment(),
      diff = now.diff(startingDate,'days') + 1,
      personInCharge = people[diff % people.length];  
  return personInCharge;      
}