/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-15 19:33:19
 * @version $Id$
 */

var aqiInput = document.getElementById("aqi-input");
var leftIn = document.getElementById("left-in");
var rightIn = document.getElementById("right-in");
var leftOut = document.getElementById("left-out");
var rightOut = document.getElementById("right-out");
var queue = document.getElementById("queue");
var random = document.getElementById('random');
var sort = document.getElementById('sort');
var speed = document.getElementById('speed');
var array=[];
var action = false;

function randomNum(){
	if(action){
		alert("你快你飞过去，我慢我慢慢排");
		return;
	}
	queue.innerHTML="";
	array=[];
	for (var k = 0; k < 50; k++) {
		array[k] = Math.floor(Math.random()*100);
		queue.innerHTML+="<div style='height:"+parseInt(array[k])*4+"px;'></div>";
	};

}

function BubbleSort() {
		var len = array.length,
			div = queue.getElementsByTagName('div'),
			i = 0,
			j = 0,
			temp,
			clear = null;
		if (!len) {
			alert("没有数排什么鬼");
			return;
		};
		action = true;
		clear = setInterval(run,speed.value);
		function run() {
			if(i < len ){
				if(j < len - i -1) {
					if(array[j] > array[j+1]) {
						temp = array[j];
						array[j] = array[j+1];
						array[j+1] = temp;
						div[j].style.height = array[j] * 4 + 'px';
						div[j+1].style.height = array[j+1] * 4 + 'px';
					}
					j++;
					return; 
				} else {
					j = 0;
				}
				i++;
			} else {
				clearInterval(clear);
				action = false ;
			}

		}
	} 

function insertNumber(event,text){
	if(action){
		alert("你快你飞过去，我慢我慢慢排");
		return;
	}
	if(text == "leftin"){
		if (!inputCheck()) {
			return;
		};
		if(!queue.innerHTML){
			queue.innerHTML="<div style='height:"+parseInt(aqiInput.value)*4+"px;'></div>";
			array.unshift(aqiInput.value);
			return;
		}
			var tempDiv = document.createElement("div");
			tempDiv.style="height:"+parseInt(aqiInput.value)*4+"px;";
			//var span=document.createElement("span");
			//span.innerHTML=aqiInput.value;
			//tempDiv.appendChild(span);
			queue.insertBefore(tempDiv, queue.childNodes[0]);
			array.unshift(aqiInput.value);
			//tempDiv.childNodes[0].innerText = aqiInput.value;
	}
	else if(text == "leftout"){
		//alert(array.length);
		if(!array){
			alert("已经没有数啦！");
		}
		queue.removeChild(queue.childNodes[0]);
		array.splice(0,0);
	}
	else if(text == "rightin"){
		if (!inputCheck()) {
			return;
		};
		queue.innerHTML+="<div style='height:"+parseInt(aqiInput.value)*4+"px;'></div>";
		array.push(aqiInput.value);
	}
	else if(text == "rightout"){
		if(!array){
			alert("已经没有数啦！");
		}
		queue.removeChild(queue.lastChild);
		array.pop();
	}
	//alert(array.length);
}

function inputCheck(){
	var getText = aqiInput.value;
	if(!getText){
		alert("请输入一串数字！不能以0开头");
		return false;
	}
	else {
		var match = getText.match(/^[1-9][0-9]*/);

		if(!match){
			alert("请输入一串数字！不能以0开头");
			return false;
		}
		if(parseInt(getText)>100||parseInt(getText)<10)
		{
			alert("让你输10-100，你偏不，你是想飞天还是咋地？");
			return false;
		}
	}
	return true;
}

function addClickEvent(){
	//aqiInput.addEventListener('blur', inputCheck);
	var a="leftin";
	var b="rightin";
	var c="leftout";
	var d="rightout";
	leftIn.addEventListener('click', function(e){ insertNumber(e,a);});
	rightIn.addEventListener('click', function(e){ insertNumber(e,b);});
	leftOut.addEventListener('click', function(e){ insertNumber(e,c);});
	rightOut.addEventListener('click', function(e){ insertNumber(e,d);});
	random.addEventListener('click',randomNum);
	sort.addEventListener('click',BubbleSort);
}
function init(){
	aqiInput.focus();
	addClickEvent();
}
init();