dustjs-helpers
==============

how to use
----------

```sh
$ DEBUG=dustjs-helpers ./bin/www 
```

description
-----------

add helpers to dustjs expressjs 4

Adding helpers to dustjs as template engine for expressjs was hard to fix... Here is a template to proceed...
Thanks to https://github.com/chovy/express-template-demo/issues/5 [jacksleight](https://github.com/jacksleight "jacksleight") to "show me the light !" :-)

In order to use dustjs with expressjs you need consolidate.

consolidate is requiring dustjs-helpers. You need to had helpers to dustjs-helpers object. Be carefull to extend helpers not to replace them...

Fist require dustjs-helpers in app.js
```js
// app.js
var express = require('express'),
    logger = require('morgan'),
    dust = require('dustjs-helpers'),   // require dustjs-helpers
    less = require('less-middleware'),
    path = require('path')
    ;

var app = express(),
    router = express.Router();

var routes = require('./routes');

require('./src/dust/helpers');          // add your own helpers

var engines = require('consolidate');   // require consolidate
app.engine('dust', engines.dust);       // define dust as template engine
```

Second define your own templates in src/dust/helpers/index.js
```js
(function (dust) {

	var helpers = {
		"myHelper": function(chunk, context, bodies, params) {
    		return chunk.write('myHelper rocks !');
  		},
	}; // helpers

	// extend the original dustjs-helpers object
	for (var attrname in helpers) { dust.helpers[attrname] = helpers[attrname]; }

}(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust));
```
The for loop allows to extend dustjs-helpers without this you will replace the helpers.

helpers
-------

### myHelper

useless helper for demo only. Print out 'myHelper rocks !'

```dust
    <p>MyHelper (must be 'myHelper rocks !') : {@myHelper /}</p>
```

### markdown

Simple markdown helper. Read markdown from a param. and output markdown.

```dust
    <p>{@markdown file="data/content.md"/}</p>
```

