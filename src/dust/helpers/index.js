(function (dust) {

	var helpers = {
		"myHelper": function(chunk, context, bodies, params) {
    		return chunk.write('myHelper rocks !');
  		},
	}; // helpers

	// extend the original dustjs-helpers object
	for (var attrname in helpers) { dust.helpers[attrname] = helpers[attrname]; }

}(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust));