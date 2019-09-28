//create by jsc 
(function(){
var mods = [],version = parseFloat(seajs.version);
define([],function(require,exports,module){

	var uri		= module.uri || module.id,
		m		= uri.split('?')[0].match(/^(.+\/)([^\/]*?)(?:\.js)?$/i),
		root	= m && m[1],
		name	= m && ('./' + m[2]),
		i		= 0,
		len		= mods.length,
		curr,args;
	    name = name.replace(/\.r[0-9]{15}/,"");
	//unpack
	for(;i<len;i++){
		args = mods[i];
		if(typeof args[0] === 'string'){
			name === args[0] && ( curr = args[2] );
			args[0] = root + args[0].replace('./','');
			(version > 1.0) &&	define.apply(this,args);
		}
	}
	mods = [];
	require.get = require;
	return typeof curr === 'function' ? curr.apply(this,arguments) : require;
});
define.pack = function(){
	mods.push(arguments);
	(version > 1.0) || define.apply(null,arguments);
};
})();
//all file list:

//js file list:

//tmpl file list:
define.pack("./tmpl",[],function(require, exports, module){
var tmpl = { 
'encodeHtml': function(s){return (s+'').replace(/[\x26\x3c\x3e\x27\x22\x60]/g,function($0){return '&#'+$0.charCodeAt(0)+';';});}
};
return tmpl;
});
