var _ = require('lodash');
module.exports = {
  randomize: randomize
};

function randomize(list) {
  list = _.split(list, ' ');
  if (_.isEmpty(list)) return undefined;
  return list[_.random(list.length-1)];
}