(function(window){
	var Toast = function(){}
	Toast.prototype =  {
		constructor:Toast,
		//构建Toast
		build : function(params,cb){
			var that = this;
			var toastHtml = '';
			var iconHtml = '';
			var duration = params.duration ? params.duration : "2000";
			switch (params.type) {
	              case "success":
	                   iconHtml = '<i class="aui-iconfont aui-icon-correct"></i>';
	                  break;
	              case "fail":
	                   iconHtml = '<i class="aui-iconfont aui-icon-close"></i>';
	                  break;
	              case "custom":
	                   iconHtml = params.html;
	                  break;
	              case "loading":
	                   iconHtml = '<div class="aui-toast-loading"></div>';
	                 break;
	      }
			var titleHtml = params.title ? '<div class="aui-toast-content">'+params.title+'</div>' : '';
			toastHtml = '<div class="aui-toast">'+iconHtml+titleHtml+'</div>';
			document.body.insertAdjacentHTML('beforeend', toastHtml);
			that.show();
			setTimeout(function(){
                  that.hide();
            }, duration)
		},
		//显示
		show: function(){
	        document.querySelector(".aui-toast").style.display = "block";
	        document.querySelector(".aui-toast").style.marginTop =  "-"+Math.round(document.querySelector(".aui-toast").offsetHeight/2)+"px";
	        if(document.querySelector(".aui-toast"))return;
		},
		//移除
		hide:function(){	
          if(document.querySelector(".aui-toast")){
              document.querySelector(".aui-toast").parentNode.removeChild(document.querySelector(".aui-toast"));
          }
		},
		//成功
		success:function(params,cb){
		  var that = this;
		  params.type = "success";
		  return that.build(params,cb)
		},
		//失败
		fail :function(params,cb){
		  var that = this;
		  params.type = "fail";
		  return that.build(params,cb)	
		},
		//自定义图标
		custom: function(params,cb){
		  var that = this;
		  params.type = "custom";
		  return that.build(params,cb)		
		},
		//加载
		loading:function(params,cb){
		  var that = this;
		  params.type = "loading";
		  return that.build(params,cb)
		}
	}
	window.Toast = Toast;
})(window)