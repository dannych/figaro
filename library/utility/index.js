var _ = require('lodash');

module.exports = {
  randomize: randomize,
  roll: roll,
};

function randomize(list) {
  list = _.split(list, ' ');
  if (_.isEmpty(list)) return undefined;
  return list[_.random(list.length-1)];
}

function roll(num) {
  console.log(num);
  num = num || 6;
  console.log(_.random(1,num));
  return _.random(1,num);
}