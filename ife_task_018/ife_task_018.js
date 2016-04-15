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
function insertNumber(event,text){
	if(text == "leftin"){
		if(!queue.innerHTML){
			queue.innerHTML="<div><span>"+aqiInput.value+"</span></div>";
			return;
		}
			var tempDiv = document.createElement("div");
			var span=document.createElement("span");
			span.innerHTML=aqiInput.value;
			tempDiv.appendChild(span);
			queue.insertBefore(tempDiv, queue.childNodes[0]);
			//tempDiv.childNodes[0].innerText = aqiInput.value;
	}
	else if(text == "leftout"){
		queue.removeChild(queue.childNodes[0]);
	}
	else if(text == "rightin"){
		queue.innerHTML+="<div><span>"+aqiInput.value+"</span></div>";
	}
	else if(text == "rightout"){
		queue.removeChild(queue.lastChild);
	}

}

function inputCheck(){
	var getText = aqiInput.value;
	if(!getText){
		alert("请输入一串数字！");
	}
	else {
		var match = getText.match(/^[1-9][0-9]*/);

		if(!match){
			alert(match);
		}
/*		else{
			insertNumber(getText);
		}*/
	}
}

function addClickEvent(){
	aqiInput.addEventListener('blur', inputCheck);
	var a="leftin";
	var b="rightin";
	var c="leftout";
	var d="rightout";
	leftIn.addEventListener('click', function(e){ insertNumber(e,a);});
	rightIn.addEventListener('click', function(e){ insertNumber(e,b);});
	leftOut.addEventListener('click', function(e){ insertNumber(e,c);});
	rightOut.addEventListener('click', function(e){ insertNumber(e,d);});
}
function init(){
	aqiInput.focus();
	addClickEvent();
}
init();