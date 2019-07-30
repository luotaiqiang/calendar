# dropLoad
支持移动端滑动下载数据

# 如何使用
1.引入jquery或者zepto。(支持模块化加载)  
2.引入dropLoad.js  
 
# 调用方法 如下  
  $("选择元素").loadDrop({  
   >  $element:$("选择元素"), 
   > 
   >  loadDownFn:function (me) {  
   >>>    loadAjax(me) // 这里是自己调用的函数  
   >
   > } 
   > 
   })  
  
  function loadAjax(me){  
   >  $.ajax({  
   >>    url: "http://g.cn", 
   > 
   >>    dataType: "json",
   >
     success:function(data){  
   >    // 滚动解锁  
   >>	   me.unLock()  
   >>    // 对相关数据操作  
   >> 	  ...   
   >>    ...   
   >>    ...  
   >> 	  // 加载数据之后需要重置  
   >>	   me.resetload() 
   > 
   	 },  
   
   error:function(){  
>
   >>    // 加载数据之后需要重置  
   >>    me.resetload() 
   >  
    }  
  })  
