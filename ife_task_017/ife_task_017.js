/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-14 16:37:17
 * @version $Id$
 */

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var formGraTime = document.getElementById('form-gra-time');
var citySelect = document.getElementById('city-select');
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
/**
 * 渲染图表
 */
function renderChart() {
	var get_chart = document.getElementById('aqi-chart-wrap');
	var color;
	var text="";
	for(var i in chartData){
		color="#"+Math.floor(Math.random()*0xffffff).toString(16);
		text+="<div title='"+i+"' style='height:"+chartData[i]+"px;background-color:"+color+";'></div>";
		get_chart.innerHTML=text;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

	if (pageState.nowGraTime==this.value) {
		//这里选项是有可能不变的
		return;
	}
	else{
		pageState.nowGraTime=this.value;
	}
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  if (pageState.nowSelectCity==this.value) {    
  //这里的this指向select，但是只有change才会进来，所以其实没必要判断
  	return;
  }
  else{
  	pageState.nowSelectCity=this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var getInput = formGraTime.getElementsByTagName("input");
	for (var i = 0; i < getInput.length; i++) {
		getInput[i].addEventListener('click',graTimeChange);
	};
	/*for(var item in getInput){
		
		if(item.hasOwnProperty){
			alert(item);
		addEventListener(item,'click',graTimeChange);}
	}*/
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	for(var i in aqiSourceData){
		citySelect.innerHTML+='<option>'+i+'</option>';
	}

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  	citySelect.addEventListener('change',citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCityData = aqiSourceData[pageState.nowSelectCity]; //得到92天数据

  if (pageState.nowGraTime=='day'){
  	 //
  	chartData = nowCityData;
  }
  else if(pageState.nowGraTime=='week'){
  	chartData = {};
  	var flag1 = 0;
  	var weekSum = 0;
  	var weekNumber = 1;
  	var i;
  	for (i in nowCityData) {
  		weekSum+=nowCityData[i];
  		flag1++;
  		if(flag1==7){
  			chartData['第'+weekNumber+'周'] = Math.floor(weekSum/flag1);
  			flag1 = 0;
  			weekNumber++;
  			weekSum = 0;
  		}
  	};
  	if(flag1!=0){
  		chartData['第'+weekNumber+'周'] = Math.floor(weekSum/flag1);
  	}
  }
  else if(pageState.nowGraTime == 'month'){
  	chartData = {};
  	var flag2 = 0;
  	var monthSum = 0;
  	var monthNumber = 0;
  	var j;
  	for ( j in nowCityData) {
  		monthSum+=nowCityData[j];
  		flag2++;

  		if((new Date(j)).getMonth()!=monthNumber){
  			chartData['第'+monthNumber+'月'] = Math.floor(monthSum/flag2);
  			flag2 = 0;
  			monthNumber++;
  			monthSum = 0;
  		}
  	};
  	if(flag2!=0){
  		chartData['第'+monthNumber+'月'] = Math.floor(monthSum/flag2);
  	}  	
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
    renderChart();
}

init();
