/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-23 16:39:40
 * @version $Id$
 */
function waterfall(parent,box){
 	var oParent = document.getElementById(parent);
 	var getBox = oParent.getElementsByClassName(box);
 	//获得一个box的宽度和列数
 	var getBoxW = getBox[0].offsetWidth;
 	var clientW = document.documentElement.clientWidth || document.body.clientWidth;
 	var cols = Math.floor(clientW/getBoxW);
 	//父容器定宽，使页面大小变化时float元素不乱动
 	oParent.style.cssText="width:"+getBoxW*cols+"px";
 	//定义一个数组存放当前的各列高度
 	var hArr = [];
 	for (var i = 0; i < getBox.length; i++) {
 		//如果是第一列，压入box高度
 		if(i < cols){
 			hArr.push(getBox[i].offsetHeight);
 		}
 		else{
 			var getminH = Math.min.apply(null,hArr);
 			//得到当前最矮列的索引
 			var index = getIndex(hArr,getminH);
 			//将当前图片放到该列下
 			getBox[i].style.cssText = "position:absolute; top:"+getminH+"px; left:"+index*getBoxW+"px;";
 			//该列高度增加
 			//console.log(getBox[i].offsetHeight);
 			hArr[index] += getBox[i].offsetHeight;
 		}
 	};
}
function getIndex(arr,val){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			return i;
		};
	};
}
function checkScrollSlide(){
 	var oParent = document.getElementById('container');
 	var getBox = oParent.getElementsByClassName('box');
 	var lastBox = getBox[getBox.length-1].offsetTop + Math.floor(getBox[getBox.length-1].offsetHeight/2);
 	var scrollSlide = document.body.scrollTop || document.documentElement.scrollTop;
 	var bodyheight = document.body.clientHeight || document.documentElement.clientHeight;
 	if( (lastBox < scrollSlide + bodyheight) ? true : false){
 		return true;
 	}
 	else{
 		console.log(lastBox);
 		console.log(scrollSlide + bodyheight);
 		return false;
 	}
}
waterfall('container','box');
var JSONPdata = {"data":[{"src":'21.jpg'},{"src":'22.jpg'},{"src":'23.jpg'},{"src":'24.jpg'},{"src":'25.jpg'}]} 
window.onscroll = function(){
	//console.log(checkScrollSlide());
	if(checkScrollSlide()){
		var oParent = document.getElementById('container');
		for (var i = 0; i < JSONPdata.data.length; i++) {
			var oBox = document.createElement('div');
			oBox.className = 'box';
			var oPic = document.createElement('div');
			oPic.className = 'pic';
			var oImg = document.createElement('img');
			oImg.src = 'images/' + JSONPdata.data[i].src;
			oParent.appendChild(oBox);
			oBox.appendChild(oPic);
			oPic.appendChild(oImg);
		}
		waterfall('container','box');
	} 
}
