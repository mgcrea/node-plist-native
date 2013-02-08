'use strict';
// nodemon -w . --exec npm test

var util = require('util'),
fs = require('fs');

var log = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return util.log(util.inspect.call(null, args.length === 1 ? args[0] : args, false, null, true));
};

var plist = require('../index');

module.exports.parse = function(assert) {
  var filename = __dirname + '/fixtures/itunes-small.xml';
  var buffer = fs.readFileSync(filename);
  var obj = plist.parseString(buffer);

  assert.equal(true, !!(obj && obj['Tracks'] && obj['Tracks']['96']));
  var track = obj['Tracks']['96'];
  var expected = '{"Track ID":96,"Name":"EXP","Artist":"Jimi Hendrix","Album Artist":"Jimi Hendrix","Album":"Axis: Bold As Love","Genre":"Rock","Kind":"MPEG audio file","Size":2317095,"Total Time":115617,"Track Number":1,"Year":1967,"Date Modified":"2010-01-26T04:42:36.000Z","Date Added":"2010-02-06T03:05:30.000Z","Bit Rate":160,"Sample Rate":44100,"Comments":"EAC-Lame3.92-Extreme","Skip Count":1,"Skip Date":"2010-02-22T23:30:15.000Z","Persistent ID":"E4A63A7D3E89DBDF","Track Type":"File","Location":"file://localhost/Users/nrajlich/Music/iTunes/iTunes%20Media/Music/Jimi%20Hendrix/Axis_%20Bold%20As%20Love/01%20EXP.mp3","File Folder Count":5,"Library Folder Count":1}';
  assert.equal(JSON.stringify(track), expected);
  assert.done();
};

module.exports.parseString = function(assert) {
  var filename = __dirname + '/fixtures/itunes-small.xml';
  var str = fs.readFileSync(filename, 'utf8');
  var obj = plist.parseString(str);

  assert.equal(true, !!(obj && obj['Tracks'] && obj['Tracks']['96']));
  var track = obj['Tracks']['96'];
  var expected = '{"Track ID":96,"Name":"EXP","Artist":"Jimi Hendrix","Album Artist":"Jimi Hendrix","Album":"Axis: Bold As Love","Genre":"Rock","Kind":"MPEG audio file","Size":2317095,"Total Time":115617,"Track Number":1,"Year":1967,"Date Modified":"2010-01-26T04:42:36.000Z","Date Added":"2010-02-06T03:05:30.000Z","Bit Rate":160,"Sample Rate":44100,"Comments":"EAC-Lame3.92-Extreme","Skip Count":1,"Skip Date":"2010-02-22T23:30:15.000Z","Persistent ID":"E4A63A7D3E89DBDF","Track Type":"File","Location":"file://localhost/Users/nrajlich/Music/iTunes/iTunes%20Media/Music/Jimi%20Hendrix/Axis_%20Bold%20As%20Love/01%20EXP.mp3","File Folder Count":5,"Library Folder Count":1}';
  assert.equal(JSON.stringify(track), expected);
  assert.done();
};
