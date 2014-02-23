'use strict';

var libxml = require('libxmljs');

var toPlist = function(doc, object, parent) {
  if(!parent) parent = doc.root();

  var element;
  switch(typeof object) {
  case 'object':
    if(object instanceof Buffer) {
      element = libxml.Element(doc, 'data').text(object.toString('base64'));
    } else if(object instanceof Date) {
      element = libxml.Element(doc, 'date').text(object.toISOString().substr(0, 19) + 'Z');
    } else if(Array.isArray(object)) {
      element = libxml.Element(doc, 'array');
      object.forEach(function(node) { toPlist(doc, node, element); });
    } else {
      element = libxml.Element(doc, 'dict');
      Object.keys(object).forEach(function(key) {
        element.addChild(libxml.Element(doc, 'key').text(key));
        toPlist(doc, object[key], element);
      });
    }
    break;
  case 'string':
    element = libxml.Element(doc, 'string').text(object);
    break;
  case 'number':
    element = libxml.Element(doc, object % 1 === 0 ? 'integer' : 'real').text(object);
    break;
  case 'boolean':
    element = libxml.Element(doc, object.toString());
    break;
  default:
    throw new Error('Unhandled type ' + typeof object);
  }

  return parent.addChild(element);

};

var toObject = function(node) {

  var filterTextNodes = function(node) {
    return node.type() !== 'text';
  };

  switch(node.name()) {
  case 'plist':
    return node.childNodes().filter(filterTextNodes).map(toObject);
  case 'array':
    return node.childNodes().filter(filterTextNodes).map(toObject);
  case 'dict':
    var nodes = node.childNodes().filter(filterTextNodes).map(toObject),
        dict = {};
    for(var i = 1; i < nodes.length; i += 2) {
      dict[nodes[i - 1]] = nodes[i];
    }
    return dict;
  case 'key':
    return node.text();
  case 'string':
    return node.text();
  case 'integer':
    return parseInt(node.text(), 10);
  case 'real':
    return parseFloat(node.text());
  case 'data':
    return new Buffer(node.text(), 'base64');
  case 'date':
    return new Date(node.text());
  case 'true':
    return true;
  case 'false':
    return false;
  case 'text':
    return;
  case 'comment':
    return;
  default:
    throw new Error('Unhandled nodeName:' + node.name());
  }

};

exports.buildString = function(data, formatted) {
  var xmlDoc = libxml.Document();
  xmlDoc.setDtd('plist', '-//Apple Computer//DTD PLIST 1.0//EN', 'http://www.apple.com/DTDs/PropertyList-1.0.dtd');
  var plist = xmlDoc.node('plist').attr('version', '1.0');
  toPlist(xmlDoc, data);
  return xmlDoc.toString(formatted !== false);
};
exports.buildStringSync = exports.parseString;

exports.parseString = function(xml) {
  var xmlDoc = libxml.parseXml(xml);
  var object = toObject(xmlDoc.root());
  return object.length === 1 ? object[0] : object;
};
exports.parseStringSync = exports.parseString;

exports.build = function(data, formatted) {
  return new Buffer(exports.buildString(data, formatted));
};

exports.parse = function(data) {
  return exports.parseString(data);
};
