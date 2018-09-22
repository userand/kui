+(function(window,undefined){	
	var until = {};		
	var root = this;
	//获取元素
	until.id=function(id){ 
		return document.getElementById(id);
	}
	until.tn = function(tagName){
		return document.getElementsByTagName(tagName);
	}
	until.cls = function(clsname){
		return document.getElementsByClassName(clsname)
	}
	
	//属性相关
	until.typeError = function(element){
		if(!until.isElement(element)){ //如果传递进来的不是一个dom元素 给出警告
            console.warn('警告:"element"参数必须是一个DOM元素 ');
            return;
      	}
	}	
	//设置css样式
	until.css = function(element, css){
        if(!until.isElement(element)){
            until.typeError(element);
        }
        if(typeof css == 'string' && css.indexOf(':') != -1){
			element.style.cssText = css;
        }
   };  
    //查看元素是否包含某个元素
   until.hasClass = function(element,clsname){
   		if(!until.isElement(element)){
            until.typeError(element);
        }
   		var flag;
   		if(element.className.indexOf(clsname)!=-1){
   			 return flag = true;
   		}else{
   			 return flag = false;
   		}
   }
   //新增样式
   until.addClass = function(element,clsname){
    	if(!until.isElement(element)){
            until.typeError(element);
        }
    	var oldName = element.className;
    	var newName = oldName+' '+clsname;
    	element.className = newName;
    	return element;
   }

   //移除样式
   until.removeClass = function(element,clsname){
   		if(!until.isElement(element)){
            until.typeError(element);
        }
   		var oldName = element.className;
   		var newName = oldName.replace(clsname,'');
   		element.className = newName;
   		return element;
   }
   //来回切换样式
    until.toggleClass = function(element,clsname){
    	if(!until.isElement(element)){
            until.kuiTypeError(element);
        }
    	if(!until.hasClass(element,clsname)){
    		until.addClass(element,clsname)
    	}else{
    		until.removeClass(element,clsname);
    	}
    	return element;	
    }
   
   //属性操作
   until.attr = function(element, name, value){	
		if(!until.isElement(element)){
            until.typeError(element);
        }
		if(arguments.length==2){ //两个参数说明是想获取元素属性
			return element.getAttribute(name);
		}else if(arguments.length==3){ //三个参数说明是想设置元素属性
			return element.setAttribute(name,value);
		}
	}  
	//val值操作
    until.val = function(element,value){
   		if(!until.isElement(element)){
            until.typeError(element);
        }
   	   if(arguments.length===1){  //一个参数获取val
   			switch (element.tagName.toLowerCase()){
   				case 'input':
   					return element.value
   					break;
   				case 'textarea':
   					return element.value
   				break;
   				case 'select':
   					return element.options[el.selectedIndex].value;
   				break;
   			}		
   		}
   	   if(arguments.length===2){  //两个参数设置val
   	   		switch (element.tagName.toLowerCase()){
   				case 'input':
   					  return element.value = value;
   					break;
   				case 'textarea':
   					  return element.value = value;
   				break;
   				case 'select':
   					  return element.options[el.selectedIndex].value = value;
   				break;
   			}		
   	   }	
    }  
    //html
    until.html = function(element,html){
    	if(!until.isElement(element)){
            until.typeError(element);
        }
    	if(arguments.length==1){  //获取
    		 element.innerHTML;
    	} 	
    	if(arguments.length==2){
    		 element.innerHTML = html;	
    	}	
    	return element;
    }
    //text
    until.text = function(element,text){
    	if(!until.isElement(element)){
            until.typeError(element);
        }
    	if(arguments.length==1){  //获取
    		return element.innerText;
    	} 	
    	if(arguments.length==2){
    		return element.innerText = text;	
    	}	
    } 
	until.getStyle = function(element, attr){
		if(!until.isElement(element)){
            until.typeError(element);
        }
		return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, false)[attr];
	}
	//事件相关
	until.on = function(element, type, method) {
		if(!until.isElement(element)){
            until.typeError(element);
        }
	    if (element.addEventListener) {
	        element.addEventListener(type, method);
	    } else if (element.attachEvent) {
	        element.attachEvent("on" + type, method);
	    } else {
	        element["on" + type] = method;
	    }
	}	
  	//字符串转对象
  	until.toJson= function(str){
  		if(typeof str =='string'){
  			return JSON.parse(str);
  		}
  	}
  	//对象转字符串
  	until.toStr = function(obj){
  		if( until.isObject(obj) ){
  			return JSON.stringify(obj)
  		}
  	}	
  	//去空格
  	until.trim =function(){
  		if (!String.prototype.trim) {
		  String.prototype.trim = function () {
		    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		  };
		}
  	}
	//继承
	until.extend = function(subClass,superClass){
		for (var attr in superClass) {			
			subClass[attr] = superClass[attr]			
		}		
	}
	//判断类型
	until.isElement = function(obj){
		return !!(obj && obj.nodeType == 1);
	}
	until.isBoolean = function(obj) {
	    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
	}	
	until.isArray = function(obj){
		return typeof obj == 'object' && obj.constructor == Array;
	}
	until.isNull = function(obj) {
	    return obj === null;
	}
  	until.isUndefined = function(obj) {
    	return obj === void 0;
  	}
	until.isObject = function(obj){
		return Object.prototype.toString.call(obj) === '[object Object]';
	}
	root.$ = until;
})(window)
