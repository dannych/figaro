var moment = require('moment');
require('moment-weekday-calc');

module.exports = {
  getTodayCs: getTodayCs,
  getNextCs: getNextCs,
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
      diff = getDiff(now,startingDate,'days'),
      personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function getNextCs() {
  var now = moment(),
      diff = getDiff(now,startingDate,'days') + 1,
      personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function getDiff(start,end) {
  return moment().isoWeekdayCalc({  
    rangeStart: start,  
    rangeEnd: end,  
    weekdays: [1,2,3,4,5],  
    // exclusions: ['6 Apr 2015','7 Apr 2015'],
    // inclusions: ['10 Apr 2015']
  }) - 1;
}