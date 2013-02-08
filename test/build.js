'use strict';
// nodemon -w . --exec npm test

var util = require('util'),
fs = require('fs');

var log = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return util.log(util.inspect.call(null, args.length === 1 ? args[0] : args, false, null, true));
};

var plist = require('../index');

module.exports.build = function(assert) {
  var filename = __dirname + '/fixtures/cordova.json';
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  var buffer = plist.build(obj);

  assert.equal(buffer instanceof Buffer, true);
  var expected = fs.readFileSync(__dirname + '/fixtures/cordova.plist', 'utf8');
  assert.equal(buffer.toString('utf8'), expected);
  assert.done();
};

module.exports.buildString = function(assert) {
  var filename = __dirname + '/fixtures/cordova.json';
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  var str = plist.buildString(obj);

  var expected = fs.readFileSync(__dirname + '/fixtures/cordova.plist', 'utf8');
  assert.equal(str, expected);
  assert.done();
};

