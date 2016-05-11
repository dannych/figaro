var moment = require('moment');

module.exports = {
  summarize: summarize
};

function summarize(resp) {
    return JSON.stringify(resp);
}
