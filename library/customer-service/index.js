var moment = require('moment');
require('moment-weekday-calc');

module.exports = {
  isTodayWeekday: isTodayWeekday,
  isTodayWeekend: isTodayWeekend,
  getTodayCs: getTodayCs,
  getNextCs: getNextCs,
};

var startingDate = moment('2016-08-10 +0700', 'YYYY-MM-DD ZZ');
var people = [
      'ahayamb',
      'rizaanjariputri',
      'timothykevin',
      'yclarista',
      'eckyputrady',
      'ariza.ramaditia',
      'adeimmanuel',
      'aditya',
      'jonathancesario',
      'dannych',
      'darwin.gautalius',
      'steven',
    ];
    
function isTodayFriday() {
  var day = moment().isoWeekday(); 
  return day === 5;
}
     
function isTodayWeekend() {
  var day = moment().isoWeekday(); 
  return day === 6 || day === 7;
}

function isTodayWeekday() {
  return !isTodayWeekend();
}
     
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

function getDiffFromNow(end) {
  return moment().utc().isoWeekdayCalc({  
    rangeEnd: end.utc(),  
    weekdays: [1,2,3,4,5],  
    exclusions: [],
    inclusions: []
    // exclusions: ['6 Apr 2015','7 Apr 2015'],
    // inclusions: ['10 Apr 2015']
  }) - 2;
}
