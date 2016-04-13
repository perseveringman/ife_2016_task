//window.onload
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input");
	var value = document.getElementById("aqi-value-input");
  var strCity = city.value.trim();
  var strAqi = value.value.trim();
      if (!strCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符！");
        return;
    }
    if (!strAqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return;
    }
  var name = city.value;
  aqiData[name] = value.value;
	//aqiData[city.value] = value.value;
  
	//alert(aqiData[name]);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqi_table = document.getElementById('aqi-table');
  aqi_table.innerHTML="";
  var aqi_head = document.getElementById('aqi-head');

  var strCity;


      if(!aqi_head){
      aqi_table.innerHTML = "<tr id='aqi-head'><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    }
  for(strCity in aqiData){

    aqi_table.innerHTML+=("<tr>\
        <td>"+strCity+"</td><td>"+aqiData[strCity]+"</td><td><button id='"+strCity+"' class='del-btn'>删除</button></td>\
      </tr>");
  }
  if(!strCity){aqi_table.innerHTML="";}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
var click_btn = document.getElementById("add-btn");
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
var table = document.getElementById('aqi-table');
var del_btn = table.getElementsByClassName('del-btn');
function delBtnHandle(target) {
  // do sth.
    var tr = target.parentElement.parentElement;
    var strCity = tr.children[0].innerHTML;
    delete aqiData[strCity];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  click_btn.onclick = addBtnHandle;
  
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  table.addEventListener("click",function(e){
    if(e.target && e.target.nodeName==="BUTTON"){
      delBtnHandle(e.target);
      alert("ok");
    }
  });
}

init();