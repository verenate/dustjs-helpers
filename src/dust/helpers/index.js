var fs = require('fs')
	md = require('marked');

(function (dust) {

	var helpers = {
		"myHelper": function(chunk, context, bodies, params) {
    		return chunk.write('myHelper rocks !');
  		},
		"markdown": function(chunk, context, bodies, params) {
			var file = dust.helpers.tap(params.file, chunk, context);
			return chunk.map(function(chunk) {
        		chunk.end(md(fs.readFileSync(file,"utf8")));
    		});
  		}
	}; // helpers

	// extend the original dustjs-helpers object
	for (var attrname in helpers) { dust.helpers[attrname] = helpers[attrname]; }

}(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust));