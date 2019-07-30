/**用法
 * Lunar.toSolar(2016, 6, 3); 农历转化公历
 * Lunar.toLunar(2016, 7, 6); 公历转化农历
 */
 /**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @Author  Jea杨(JJonline@JJonline.Cn) 
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Version 1.0.2
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
var calendar = {
 
 /**
   * 农历1900-2100的润大小信息表
   * @Array Of Property
   * @return Hex 
   */
 lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
         0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
         0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
         0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
         0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
         0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
         0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
         0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
         0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
         0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
         0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
         0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
         0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
         0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
         0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
         /**Add By JJonline@JJonline.Cn**/
         0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
         0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
         0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
         0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
         0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
         0x0d520],//2100

 /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number 
   */
 solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],

 /**
   * 数字转中文速查表
   * @Array Of Property 
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string 
   */
 nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],

 /**
   * 日期转农历称呼速查表
   * @Array Of Property 
   * @trans ['初','十','廿','卅']
   * @return Cn string 
   */
 nStr2:["\u521d","\u5341","\u5eff","\u5345"],

 /**
   * 月份转农历称呼速查表
   * @Array Of Property 
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string 
   */
 nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],

 /**
   * 返回农历y年一整年的总天数
   * @param lunar Year
   * @return Number
   * @eg:var count = calendar.lYearDays(1987) ;//count=387
   */
 lYearDays:function(y) {
     var i, sum = 348;
     for(i=0x8000; i>0x8; i>>=1) { sum += (calendar.lunarInfo[y-1900] & i)? 1: 0; }
     return(sum+calendar.leapDays(y));
 },

 /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param lunar Year
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   */
 leapMonth:function(y) { //闰字编码 \u95f0
     return(calendar.lunarInfo[y-1900] & 0xf);
 },

 /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param lunar Year
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   */
 leapDays:function(y) {
     if(calendar.leapMonth(y))  { 
         return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29); 
     }
     return(0);
 },

 /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @param lunar Year
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   */
 monthDays:function(y,m) {
     if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
     return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
 },

 /**
   * 返回公历(!)y年m月的天数
   * @param solar Year
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   */
 solarDays:function(y,m) {
     if(m>12 || m<1) {return -1} //若参数错误 返回-1
     var ms = m-1;
     if(ms==1) { //2月份的闰平规律测算后确认返回28或29
         return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
     }else {
         return(calendar.solarMonth[ms]);
     }
 },
 /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param lunar month
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   */
 toChinaMonth:function(m) { // 月 => \u6708
     if(m>12 || m<1) {return -1} //若参数错误 返回-1
     var s = calendar.nStr3[m-1];
     s+= "\u6708";//加上月字
     return s;
 },

 /**
   * 传入农历日期数字返回汉字表示法
   * @param lunar day
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   */
 toChinaDay:function(d){ //日 => \u65e5
     var s;
     switch (d) {
         case 10:
         s = '\u521d\u5341'; break;
     case 20:
         s = '\u4e8c\u5341'; break;
         break;
     case 30:
         s = '\u4e09\u5341'; break;
         break;
     default :
         s = calendar.nStr2[Math.floor(d/10)];
         s += calendar.nStr1[d%10];
     }
     return(s);
 },

 /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * @param y  solar year
   * @param m  solar month
   * @param d  solar day
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   */
 solar2lunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
     if(y<1900 || y>2100) {return -1;}//年份限定、上限
     if(y==1900&&m==1&&d<31) {return -1;}//下限
     if(!y) { //未传参  获得当天
         var objDate = new Date();
     }else {
         var objDate = new Date(y,parseInt(m)-1,d)
     }
     var i, leap=0, temp=0;
     //修正ymd参数
     var y = objDate.getFullYear(),m = objDate.getMonth()+1,d = objDate.getDate();
     var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
     for(i=1900; i<2101 && offset>0; i++) { temp=calendar.lYearDays(i); offset-=temp; }
     if(offset<0) { offset+=temp; i--; }
     
     //是否今天
     var isTodayObj = new Date(),isToday=false;
     if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
         isToday = true;
     }
     //星期几
     var nWeek = objDate.getDay(),cWeek = calendar.nStr1[nWeek];
     if(nWeek==0) {nWeek =7;}//数字表示周几顺应天朝周一开始的惯例
     //农历年
     var year = i;
     
     var leap = calendar.leapMonth(i); //闰哪个月
     var isLeap = false;
     
     //效验闰月
     for(i=1; i<13 && offset>0; i++) {
         //闰月
         if(leap>0 && i==(leap+1) && isLeap==false){ 
             --i;
             isLeap = true; temp = calendar.leapDays(year); //计算农历闰月天数
         }
         else{
             temp = calendar.monthDays(year, i);//计算农历普通月天数
         }
         //解除闰月
         if(isLeap==true && i==(leap+1)) { isLeap = false; }
         offset -= temp;
     }
     
     if(offset==0 && leap>0 && i==leap+1)
     if(isLeap){
         isLeap = false;
     }else{ 
         isLeap = true; --i;
     }
     if(offset<0){ offset += temp; --i; }
     //农历月
     var month   = i;
     //农历日
     var day     = offset + 1;
     
     return {'lYear':year,'lMonth':month,'lDay':day,'IMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),'IDayCn':calendar.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'nWeekCn':"\u661f\u671f"+cWeek};
 },

 /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param y  lunar year
   * @param m  lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
 lunar2solar:function(y,m,d,isLeapMonth) {   //参数区间1900.1.31~2100.12.1
     var isLeapMonth = !!isLeapMonth;
     var leapOffset  = 0;
     var leapMonth   = calendar.leapMonth(y);
     var leapDay     = calendar.leapDays(y);
     if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
     if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值 
     var day  = calendar.monthDays(y,m); 
     var _day = day;
     //bugFix 2016-9-25 
     //if month is leap, _day use leapDays method 
     if(isLeapMonth) {
         _day = calendar.leapDays(y,m);
     }
     if(y < 1900 || y > 2100 || d > _day) {return -1;}//参数合法性效验
     
     //计算农历的时间差
     var offset = 0;
     for(var i=1900;i<y;i++) {
         offset+=calendar.lYearDays(i);
     }
     var leap = 0,isAdd= false;
     for(var i=1;i<m;i++) {
         leap = calendar.leapMonth(y);
         if(!isAdd) {//处理闰月
             if(leap<=i && leap>0) {
                 offset+=calendar.leapDays(y);isAdd = true;
             }
         }
         offset+=calendar.monthDays(y,i);
     }
     //转换闰月农历 需补充该年闰月的前一个月的时差
     if(isLeapMonth) {offset+=day;}
     //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
     var stmap   =   Date.UTC(1900,1,30,0,0,0);
     var calObj  =   new Date((offset+d-31)*86400000+stmap);
     var cY      =   calObj.getUTCFullYear();
     var cM      =   calObj.getUTCMonth()+1;
     var cD      =   calObj.getUTCDate();

     return calendar.solar2lunar(cY,cM,cD);
 }
};
window.calendar=calendar;