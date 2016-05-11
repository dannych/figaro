var moment = require('moment');
require('moment-weekday-calc');

module.exports = {
  getTodayCs: getTodayCs,
  getNextCs: getNextCs,
};

var startingDate = moment('2016-05-10 +0700', 'YYYY-MM-DD ZZ'),
    people = [
      'darwin.gautalius',
      'steven',
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
  var diff = getDiffFromNow(startingDate),
    personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function getNextCs() {
  var diff = getDiffFromNow(startingDate) + 1,
    personInCharge = people[diff % people.length];  
  return personInCharge;      
}

function getDiffFromNow(start) {
  return start.utc().isoWeekdayCalc({  
    rangeEnd: moment().utc(),  
    weekdays: [1,2,3,4,5],  
    // exclusions: ['6 Apr 2015','7 Apr 2015'],
    // inclusions: ['10 Apr 2015']
  }) - 1;
}