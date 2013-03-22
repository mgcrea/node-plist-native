[node-plist-native](http://mgcrea.github.com/node-plist-native) [![Build Status](https://secure.travis-ci.org/mgcrea/node-plist-native.png?branch=master)](http://travis-ci.org/#!/mgcrea/node-plist-native)
=================

Light, fast & memory efficient plist parser/builder that relies on [libxmljs](https://github.com/polotek/libxmljs).

Quick start
-----------

Install the `libxml2-dev` package required by `libxmljs` on your system.

Parsing a plist from file/string
``` javascript
var plist = require('plist-native');

var obj = plist.parse(fs.readFileSync(__dirname + '/myPlist.plist')); // parses a buffer

var obj2 = plist.parseString('<plist><string>Hello World!</string></plist>'); // parses a string

```

Building a plist from an object:
``` javascript
var plist = require('plist-native');

var buffer = plist.build({'foo' : 'bar'}); // returns a buffer

var str = plist.buildString({'foo' : 'bar'}); // returns a string

```

Benchmarks
----------

Speed benchmark with `debug` working with a 13MB iTunes.xml plist library file:

>
	------------------------------------------------------------------------------------
	|   | library      | engine (dep)  | size (lines)  | parsing       | building      |
	------------------------------------------------------------------------------------
	| 1 | plist-native | libxmljs      | 106           | 2s638ms       | 3s139ms       |
	| 2 | plist        | xmlbuilder    | 297           | 5s202ms +97%  | 3s698ms +18%  |
	| 3 | xml2js       | sax           | 254           | 6s887ms +161% | n/a           |
	------------------------------------------------------------------------------------

Memory benchmark with `memwatch` working with a 13MB iTunes.xml plist library file:

>
	------------------------------------------------------------------------------------
	|   | library      | engine (dep)  | size (lines)  | parsing       | building      |
	------------------------------------------------------------------------------------
	| 1 | plist-native | libxmljs      | 106           | 52.86mb       | 16.78mb       |
	| 2 | plist        | xmlbuilder    | 297           | 53.30mb +1%   | 156.34mb (?!) |
	| 3 | xml2js       | sax           | 254           | 61.87mb +17%  | n/a           |
	------------------------------------------------------------------------------------

Testing
-------

node-plist-native is tested with `nodeunit`.

>
	npm install --dev
	npm test

Contributing
------------

Please submit all pull requests the against master branch. If your unit test contains javascript patches or features, you should include relevant unit tests. Thanks!

Authors
-------

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea

Copyright and license
---------------------

	The MIT License

	Copyright (c) 2012 Olivier Louvignes

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
