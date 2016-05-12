var moment = require('moment');
var _ = require('lodash');

module.exports = {
  summarize: summarize
};

function summarize(messagesData, usersData) {
  var users = usersDict(usersData);
  return _.chain(userUpdates(messagesData, users)).map(userUpdatesString).join('\n').value();
}

function usersDict(usersData) {
  return _.chain(usersData.members)
          .groupBy('id')
          .mapValues(function(xs) { return xs[0].name; }).value();
}

function userUpdatesString(userUpdates) {
  return _.chain(['*' + userUpdates.user + '*', '']).concat(userUpdates.updates).join('\n').value() + '\n\n';
}

function userUpdates(messagesData, users) {
  return _.chain(messagesData.messages)
          .map(statusUpdateMessage)
          .filter(isStatusUpdateMessage)
          .groupBy('user')
          .mapValues(function(xs) { return _.flatMap(xs, 'updates'); })
          .toPairs()
          .map(function(x) { return { user: users[x[0]], updates: x[1] }; })
          .value();
}

function statusUpdateMessage(msg) {
  return {
    ts: msg.ts,
    updates: scrapDoneBullets(msg.text),
    user: msg.user
  };
}

function isStatusUpdateMessage(msg) {
  return msg.updates && msg.updates.length > 0;
}

function scrapDoneBullets(text) {
  return _.chain(sanitize(text))
          .split('\n')
          .dropWhile(function(x) { return !x.toLowerCase().startsWith('done') && !x.toLowerCase().startsWith('*done'); })
          .drop(1)
          .takeWhile(function(x) { return x.startsWith('-'); })
          .value();
}

function sanitize(text) {
  return text.replace(String.fromCharCode(8203), '');
}
