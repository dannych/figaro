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
  num = num || 6;
  return _.random(1,num);
}