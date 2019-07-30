/**生成日期控件
 * @Author  Luotaiqiang1
 * 用法 遍历日期控件 2018年7月 ~ 当前月延后三个月
 * 注意 1~12月   取月份 1 ~ 12 
 * 慎用 new Date(year,month,date)
 * 农历 calendar.solar2lunar(startyear,startMonth,date) 
 */
function mTemplate(year,month) {
	var startMonth,startyear,totalDate,nWeek,nTr,curYear,curMonth,curDate,tempDate;
	// 获取当月总天数 及 开始一天星期几 month 1~12
	 tempDate = year+'/'+month+'/1';
	 startMonth = new Date(tempDate).getMonth()+1;
	 startyear = new Date(tempDate).getFullYear();
	 totalDate = new Date(year,month,0).getDate();
	 nWeek = new Date(tempDate).getDay();
	 
	 // 获取当天的年月日时间
	 curYear = new Date().getFullYear();
	 curMonth = new Date().getMonth()+1;
	 curDate = new Date().getDate();
	 // 每月 切割 n行7列
	 nTr = nWeek == 0 ?  Math.ceil((totalDate + 7 -1)/7) : Math.ceil((totalDate + nWeek -1)/7);
	 // n行7列列表渲染
	//渲染一个月的模板
	var template='',ulStr="<ul class='calendar-cont clearfix'>",liStr='';
	 for(var i=0 ; i<nTr ;i ++){
	    for(var j=0 ;j<7 ;j++ ){
	        //给表格编号
	        var indx=i * 7 + j;
	        // 匹配周几
	        var date = nWeek == 0 ? (indx - 7 + 1) : (indx - nWeek + 1);
	        // 月份  日期格式   小于10 补'0'
	        var monthStr = startMonth < 10? '0'+startMonth : startMonth;
	        var dateStr = date + 1 < 10? '0'+(date + 1) : date + 1;
	        // if(curYear == startyear && startMonth == curMonth && date == curDate -1 ){
	        // 	// 匹配到当天选项
	        // 	liStr = liStr + '<li date="'+startyear+monthStr+dateStr+'"><p>'+(date + 1) +'</p><p>'+calendar.solar2lunar(startyear,startMonth,date+1).IDayCn +'</p></li>';
	        // }else{
	        // 	liStr = date >= 0 && date < totalDate ? liStr + '<li date="'+startyear+monthStr+dateStr+'"><p>'+(date + 1) +'</p><p>'+calendar.solar2lunar(startyear,startMonth,date+1).IDayCn +'</p></li>' : liStr + '<li class="unDate"></li>';
	        // }
            liStr = date >= 0 && date < totalDate ? liStr + '<li date="'+startyear+monthStr+dateStr+'"><p>'+(date + 1) +'</p><p>'+calendar.solar2lunar(startyear,startMonth,date+1).IDayCn +'</p></li>' : liStr + '<li class="unDate"></li>';
	    }
	}
	ulStr = ulStr +liStr + '</ul>';
	template ='<p class="month">'+startyear+'年'+(startMonth)+'月</p>'+ulStr;
	return template;
}

 function renderCalendar(Obj){
	// 2018年7月 至   当前月后面n个月 
	 /*
	  * @param minYear 最开始年份
	  * @param  minMonth 最开始月份  与 minYear搭配
	  * @param nMonth 当前月之后n个月
	  */
	 var param = {
			 minYear: 2019,
			 minMonth:5,
			 nMonth:0
	 }
	 
	 var curyear,curMonth,current = new Date();
	 Object.assign(param,Obj);
	 	// 当前月之后 nMonth个月
	 	nMonth = param.nMonth;
	 	curyear = current.getFullYear();
	 	curyear = new Date(curyear,current.getMonth()+param.nMonth).getFullYear();
	 	curMonth = new Date(curyear,current.getMonth()+param.nMonth).getMonth()+1;

	 var str='';
	 	for(var i= param.minYear;i <= curyear;i++){
	 	    for(var j=1;j<=12;j++){
	 	        if(i==param.minYear && j<param.minMonth){
	 	            continue;
	 	        }else if(i==curyear && j<=curMonth || i!=curyear){
	 	            str += mTemplate(i,j);
	 	        }
	 	    }
	     }
	 	return str;
 }
var querySel = function (deadTime) {
    // 过滤日期大于今日的日期 原生的方式实现
    eleList = document.querySelectorAll(".calendar-cont > li");
    var date ="",date0="";
    for(var j=0; j <eleList.length;j++){
        date = "";
        date = eleList[j].getAttribute("date"),date0 = date;
        if(date){
        	var newDate = new Date();
            date = date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6);
            if(((new Date(date)).getTime()>(new Date()).getTime()) || ((new Date(date)).getTime() < (new Date(deadTime)).getTime())){
                eleList[j].setAttribute("class","unsel")
            }else if(Number(date0.substring(0,4)) == newDate.getFullYear() && Number(date0.substring(4,6)) == (newDate.getMonth()+1) && Number(date0.substring(6)) == newDate.getDate()){
                eleList[j].setAttribute("class","active")
			}
        }
    }
}
 // 日历从当前日期往前一个月
var dateNum = 29 //对应30天
var deadLineTime = new Date().getTime()-Math.pow(10,7)*8.64*dateNum;
var day = new Date(deadLineTime);
var minYear = day.getFullYear();
var minMonth = day.getMonth()+1;
document.getElementById("calendar-box").innerHTML=renderCalendar({minYear:minYear,minMonth:minMonth,nMonth:0});
//过滤今日之后的日期 以及近30号以外的日期
querySel(new Date().getTime()-Math.pow(10,7)*8.64*30);



