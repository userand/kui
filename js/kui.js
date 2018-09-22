var lower = (function(window, undefined) {
	var $ = {};
	$.VERSION = '1.0';
	//获取元素
	$.id = function(id) {
		return document.getElementById(id);
	}
	$.tn = function(tagName) {
		return document.getElementsByTagName(tagName);
	}
	$.cls = function(clsname) {
			return document.getElementsByClassName(clsname)
		}
		//属性相关
	$.typeError = function(element) {
			if(!$.isElement(element)) { //如果传递进来的不是一个dom元素 给出警告
				console.warn('警告:"element"参数必须是一个DOM元素 ');
				return;
			}
	}
		//设置css样式
	$.css = function(element, css) {
		if(!$.isElement(element)) {
			$.typeError(element);
		}
		if(typeof css == 'string' && css.indexOf(':') != -1) {
			element.style.cssText = css;
		}
	};
	//可视区高
	$.viewHeight = function() {
			return document.documentElement.clientHeight || document.body.clientHeight;
		}
		//可视区宽
	$.viewWidth = function() {
			return document.documentElement.clientWidth || document.body.clientWidth
		}
		//查看元素是否包含某个元素
	$.hasClass = function(element, clsname) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			var flag;
			if(element.className.indexOf(clsname) != -1) {
				return flag = true;
			} else {
				return flag = false;
			}
		}
		//新增样式
	$.addClass = function(element, clsname) {
		if(!$.isElement(element)) {
			$.typeError(element);
		}
		var oldName = element.className;
		var newName = oldName + ' ' + clsname;
		element.className = newName;
		return element;
	}

	//移除样式
	$.removeClass = function(element, clsname) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			var oldName = element.className;
			var newName = oldName.replace(clsname, '');
			element.className = newName;
			return element;
		}
		//来回切换样式
	$.toggleClass = function(element, clsname) {
			if(!$.isElement(element)) {
				$.kuiTypeError(element);
			}
			if(!$.hasClass(element, clsname)) {
				$.addClass(element, clsname)
			} else {
				$.removeClass(element, clsname);
			}
			return element;
		}
		//属性操作
	$.attr = function(element, name, value) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			if(arguments.length == 2) { //两个参数说明是想获取元素属性
				return element.getAttribute(name);
			} else if(arguments.length == 3) { //三个参数说明是想设置元素属性
				return element.setAttribute(name, value);
			}
		}
		//val值操作
	$.val = function(element, value) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			if(arguments.length === 1) { //一个参数获取val
				switch(element.tagName.toLowerCase()) {
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
			if(arguments.length === 2) { //两个参数设置val
				switch(element.tagName.toLowerCase()) {
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
	$.html = function(element, html) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			if(arguments.length == 1) { //获取
				element.innerHTML;
			}
			if(arguments.length == 2) {
				element.innerHTML = html;
			}
			return element;
		}
		//text
	$.text = function(element, text) {
		if(!$.isElement(element)) {
			$.typeError(element);
		}
		if(arguments.length == 1) { //获取
			return element.innerText;
		}
		if(arguments.length == 2) {
			return element.innerText = text;
		}
	}
	$.getStyle = function(element, attr) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, false)[attr];
		}
		//事件相关
	$.addEvent = function(element, type, method) {
			if(!$.isElement(element)) {
				$.typeError(element);
			}
			if(element.addEventListener) {
				element.addEventListener(type, method);
			} else if(element.attachEvent) {
				element.attachEvent("on" + type, method);
			} else {
				element["on" + type] = method;
			}
		}
		//字符串转对象
	$.toJson = function(str) {
			if(typeof str == 'string') {
				return JSON.parse(str);
			}
		}
		//对象转字符串
	$.toStr = function(obj) {
			if($.isObject(obj)) {
				return JSON.stringify(obj)
			}
		}
		//去空格
	$.trim = function() {
			if(!String.prototype.trim) {
				String.prototype.trim = function() {
					return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
				};
			}
		}
		//继承
	$.extend = function(subClass, superClass) {
			for(var attr in superClass) {
				subClass[attr] = superClass[attr]
			}
		}
		//判断类型
	$.isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	}
	$.isBoolean = function(obj) {
		return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
	}
	$.isArray = function(obj) {
		return typeof obj == 'object' && obj.constructor == Array;
	}
	$.isNull = function(obj) {
		return obj === null;
	}
	$.isUndefined = function(obj) {
		return obj === void 0;
	}
	$.isObject = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	}
	window.lower = $;
	return $;
})(window);

//模态框组件
(function($, window, undefined) {
	var Modal = function(opts) {
		this.modal = null;
		this.mask = null;
		this.disX = null;
		this.disY = null;
		this.defaults = {
			width: 300,
			height: '',
			dir: 'center',
			mask: false,
			maskclose: true,
			title: '提示',
			oktext: '确认',
			caneltext: '取消',
			content: '对话框内容',
			canel: function() {},
			ok: function() {}
		}
		$.extend(this.defaults, opts);
		this.init();
	}
	Modal.prototype = {
			//更改constructor指向
			constructor: Modal,
			//初始化
			init: function() {
				this.html();
				this.createMask();
				this.setSize();
				this.setPosition();
				this.hide();
				this.drag();
			},
			//创建modal框
			html: function() {
				this.modal = document.createElement('div');
				this.modal.className = 'modal';
				this.modal.innerHTML = '<div class="modal-content">' +
					'<a class="modal-close">x</a>' +
					'<div class="modal-header"><div class="modal-header-inner">' + this.defaults.title + '</div></div>' +
					'<div class="modal-body"><p>' + this.defaults.content + '</p> </div>' +
					'<div class="modal-footer">' +
					'<button class="btn btn-primary btn-canel mr-10" type="button">' + this.defaults.caneltext + '</button>' +
					'<button class="btn btn-ok" type="button">' + this.defaults.oktext + '</button>' +
					'</div>' +
					'</div>';
				document.body.appendChild(this.modal)
				this.modal.style.transform = "scale(1)"
				this.modal.style.opacity = 1
			},
			hide: function() {
				var modal = this.modal;
				$.addEvent(modal, 'click', function(event) {
					var ev = event || window.event;
					if(ev.target.classList.contains('btn-ok')) {
						this.defaults.ok();
						document.body.removeChild(this.modal);
						if(this.mask) {
							document.body.removeChild(this.mask);
						}
					}
					if(ev.target.className == 'modal-close' || ev.target.classList.contains('btn-canel')) {
						this.defaults.canel();
						if(this.modal) {
							document.body.removeChild(this.modal);
						}
						if(this.mask) {
							document.body.removeChild(this.mask);
						}
					}
				}.bind(this));
				if(this.defaults.maskclose) {
					$.addEvent(this.mask, 'click', function(event) {
						var event = event || window.event;
						if(this.modal) {
							document.body.removeChild(this.modal);
						}
						if(this.mask) {
							document.body.removeChild(this.mask);
						}
					}.bind(this))
				}
			},
			//设置弹层大小
			setSize: function() {
				var modal_width, modal_height;
				modal_width = this.defaults.width + 'px';
				modal_height = this.defaults.height + 'px';
				this.modal.style.width = modal_width;
				this.modal.style.height = modal_height
			},
			//设置弹层位置
			setPosition: function() {
				var modal_left, modal_top,
					center = function() {
						modal_left = ($.viewWidth() - this.modal.offsetWidth) / 2 + 'px',
						modal_top = ($.viewHeight() - this.modal.offsetHeight) / 2 + 'px';
						this.modal.style.left = modal_left;
						this.modal.style.top = modal_top;
					}.bind(this),
					right = function() {
						modal_left = ($.viewWidth() - this.modal.offsetWidth) + 'px',
							modal_top = ($.viewHeight() - this.modal.offsetHeight) + 'px';
						this.modal.style.left = modal_left;
						this.modal.style.top = modal_top;
					}.bind(this),
					top = function() {
						var t = 20,
							modal_left = ($.viewWidth() - this.modal.offsetWidth) / 2 + 'px';
						this.modal.style.left = modal_left;
						this.modal.style.top = t + 'px';
					}.bind(this);
				if(this.defaults.dir == 'center') {
					center();
				} else if(this.defaults.dir == 'right') {
					right();
				} else if(this.defaults.dir == 'top') {
					top();
				}
			},
			//创建背景遮罩
			createMask: function() {
				this.mask = document.createElement('div');
				this.mask.className = 'mask';
				document.body.appendChild(this.mask);
				this.mask.style.width = $.viewWidth() + 'px';
				this.mask.style.height = $.viewHeight() + 'px';
				this.mask.style.opacity = 1;
			},
			drag: function() {
				this.modal.onmousedown = function(event) {
					var event = event || window.event;
					this.disX = event.clientX - this.modal.offsetLeft + 'px';
					this.disY = event.clientY - this.modal.offsetTop + 'px';
					document.onmousemove = function(event) {
						var event = event || window.event;
						this.modal.style.left = event.clientX - this.disX + 'px';
						this.modal.style.top = event.clientY - this.disY + 'px';
					}.bind(this)
					document.onmouseup = function() {

					}
				}.bind(this)
			}
		}
	window.Modal = Modal;
})(lower, window);

/***
 * dorpdown 下拉菜单
 * **/
(function($, window, undefined) {
	var Dropdown = function(cls){
		this.dropdowElement = document.querySelectorAll('.dropdown');
		this.init();
	}
	Dropdown.prototype.init =function(){
		this.show();
	}	
	Dropdown.prototype.show = function(ev){
		var show = function(event){
			var event = event || window.event;
				event.cancelBubble = true;
				var pNode = this.parentNode;
				hide();
				if(!$.hasClass(pNode,'open')){
					$.addClass(pNode,'open')
				}else{
					$.removeClass(pNode,'open')
				}
		}
		var hide = function(){		
			for(var i=0; i<this.dropdowElement.length;i++){
				$.removeClass(this.dropdowElement[i],'open')
			}
		}.bind(this)
		for(var i = 0; i < this.dropdowElement.length; i++) {
			$.addEvent(this.dropdowElement[i].firstElementChild, 'click',show);
		}
		$.addEvent(document,'click',hide,false)
	}
	window.dropdown = Dropdown;
})(lower, window);

/***
 * tab 选项卡
 * **/
(function($, window, undefined){
	function Tabs(id,opts){
		this.tabElement =  document.getElementById(id);
		this.tabNav = this.tabElement.firstElementChild;
		this.tabBody = this.tabElement.lastElementChild;
		this.iNow = null;
		this.defaults = {
			autoplay:true,
			time:2000,
			events:'click'
		}
		$.extend(this.defaults,opts)
		this.init();
	}	
	Tabs.prototype.init = function(){
		this.show();		
		this.autoplay();
	}
	Tabs.prototype.show = function(){	
		var show = function(event){
			var event =  event || window.event;
			event.cancelBubble = true;
			var tabNavs = this.tabNav.children;
			var tabBody = this.tabBody.children;
			var index;
			for(var i=0; i<tabNavs.length;i++){
				if(tabNavs[i]== event.target) index = i;
				$.removeClass(tabNavs[i],'active')
				$.removeClass(tabBody[i],'active')
			}
			$.addClass(tabBody[index],'active')
			$.addClass(event.target,'active')
		}.bind(this);
		$.addEvent(this.tabElement,this.defaults.events,show);
	}
	Tabs.prototype.autoplay = function(){		
		if(this.defaults.autoplay){
			setInterval(function(){
				var nav,body;
				nav = this.tabNav.children;
				body =this.tabBody.children;
				this.iNow == nav.length-1  ? this.iNow = 0 : this.iNow++;
				for(var i=0; i<nav.length;i++){
					$.removeClass(nav[i],'active')
					$.removeClass(body[i],'active')
				}
				$.addClass(nav[this.iNow],'active')
				$.addClass(body[this.iNow],'active')	
			}.bind(this),this.defaults.time)	
		}
	}
	window.tabs = Tabs;
})(lower,window)
