(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        // amd
        define([], factory);
    } else if(typeof exports === 'object') {
        // cmd
        module.exports = factory();
    } else {
        // global. In browser, root will be window
        root.lazyLoad = factory();
    }
})(this, function() {

	function LazyLoad(options){
		this.target = document.querySelectorAll('.lazy');
		this.placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC";
		this.threshold = 0;
		if(options){
			for(var key in options){
				this[key] = options[key];
			}
		}
		this.init();
		this.update();
		this.Event();
	}

	LazyLoad.prototype.Event = function(){
		var that = this;
		window.onscroll = function(){
			that.update();
		}
	}
	LazyLoad.prototype.init = function(){
		
		for(var i = 0 , len = this.target.length ; i < len ; i++){
			this.target[i].loaded = false;
			if(this.target[i].tagName ==='IMG' && this.target[i].getAttribute('src') === null){
				 this.target[i].setAttribute('src',this.placeholder);
			}
			this.addHandler(this.target[i],'apper',this.EventHandler);
		};
	}
	LazyLoad.prototype.addHandler = function(element,type,fn){
		if(element.addEventListener){
			element.addEventListener(type,fn,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,fn);
		}else{
			element['on'+type] = fn;
		}
	}
	LazyLoad.prototype.update=function(){
		for(var i = 0 , len = this.target.length ; i < len ; i++){
			if(this.needToShow(this.target[i])){
				var event = document.createEvent("CustomEvent");
				event.initCustomEvent('apper',false,true,'a');
				this.target[i].dispatchEvent(event);
			}
		}
	}
	LazyLoad.prototype.EventHandler = function(){
		 var that = this;
		 if(!this.loaded){
		 	setTimeout(function(){
		 		that.setAttribute('src',that.getAttribute('data-original'));
		 	},200);
		 	this.loaded = true;
		 }
	};
	LazyLoad.prototype.needToShow = function(target){

		var viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var rollUpHeight = document.documentElement.scrollTop || document.body.scrollTop;
		if(viewportHeight + rollUpHeight > target.offsetTop - this.threshold){
			return  true;
		};

	}
	return LazyLoad;
});
 