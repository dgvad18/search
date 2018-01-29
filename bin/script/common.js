(function($, global){
	var Native = {};
	
	Native.dialog = {
		msg: function(m, t){
			layer.msg(m, {
				time: t
			});
		},
		load: function(){
			return layer.load(2, {shade: [0.2, '#000']})
		},
		close: function(e, parent){
			if(!!parent) return parent.layer.close(e);
			return layer.close(e);
		}
	};

	global.Native = Native;

}(jQuery, window));