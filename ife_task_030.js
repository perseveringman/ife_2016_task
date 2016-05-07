var getForm = document.getElementById('form_name');
var getText0 = getForm.getElementsByClassName("input")[0];
var getText1 = getForm.getElementsByClassName("input")[1];
var getText2 = getForm.getElementsByClassName("input")[2];
var getText3 = getForm.getElementsByClassName("input")[3];
var getText4 = getForm.getElementsByClassName("input")[4];
var getSubmit = document.getElementById("button");
function insertAfter(newEl, targetEl)
{
    var parentEl = targetEl.parentNode;
    console.log(newEl.className);
    if(parentEl.lastChild == targetEl)
    {
        parentEl.appendChild(newEl);
    }
    else
    {
       parentEl.insertBefore(newEl,targetEl.nextSibling);
    }            
}
function createPrompt(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	var newEl = document.createElement('p');
	var getIndex = target.getAttribute("index");
	/*"<p class='prompt pName'>请输入4-16个字符</p>";*/
	newEl.className = 'prompt';
	switch(getIndex){
		case "1": newEl.innerHTML="请输入4-16个字符";target.setAttribute("index",0);newEl.className += ' pName';insertAfter(newEl,target);break;
		case "2": newEl.innerHTML="请输入6-16个字符";target.setAttribute("index",0);newEl.className += ' pPassword';insertAfter(newEl,target);break;
		case "3": newEl.innerHTML="请再次输入密码";target.setAttribute("index",0);newEl.className += ' pPassSure';insertAfter(newEl,target);break;
		case "4": newEl.innerHTML="请输入邮箱";target.setAttribute("index",0);newEl.className += ' pEmail';insertAfter(newEl,target);break;
		case "5": newEl.innerHTML="请输入电话";target.setAttribute("index",0);newEl.className += ' pPhone';insertAfter(newEl,target);break;
		default:break;
	}

}
function nameVerification(){
	var getValue = getText0.value;
	var length = getLength(getValue);
	var getPrompt = getForm.getElementsByClassName('pName')[0];
	if(!length){
		getPrompt.innerHTML = "姓名不能为空！";
		getPrompt.className = 'prompt text_red' ;
		getText0.className = 'input border_red' ;
	}
	else if(length < 4 || length > 16){
		getPrompt.innerHTML = "请输入4-16个字符！";
		getPrompt.className = 'prompt text_red' ;
		getText0.className= 'input border_red' ;
	}
	else {
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green";
		getText0.className= 'input border_green' ;
	}
}
function passVerification(){
	var getValue = getText1.value;
	var length = getLength(getValue);
	var getPrompt = getForm.getElementsByClassName('pPassword')[0];
	console.log(getValue);
	if(!length){
		getPrompt.innerHTML = "密码不能为空！";
		getPrompt.className = 'prompt text_red pPassword' ;
		getText1.className = 'input border_red ' ;
	}
	else if(length < 4 || length > 16){
		getPrompt.innerHTML = "请输入6-16个字符，由字母开头，字母、数字和下划线混合组成！";
		getPrompt.className = 'prompt text_red pPassword' ;
		getText1.className= 'input border_red' ;
	}
	else if(!getValue.match(/^[a-zA-Z]{1}[\w\_]+$/)){
		getPrompt.innerHTML = "密码格式有误！";
		getPrompt.className = 'prompt text_red pPassword' ;
		getText1.className= 'input border_red' ;
	}
	else {
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green pPassword";
		getText1.className= 'input border_green' ;
	}
}
function passSureVerification(){
	var getPrompt = getForm.getElementsByClassName('pPassSure')[0];
	if (getText2.value!=getText1.value){
		getPrompt.innerHTML = "两次输入不相符，请重新输入！";
		getPrompt.className = 'prompt text_red pPassSure' ;
		getText2.className= 'input border_red' ;
	}
	else{
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green pPassSure";
		getText2.className= 'input border_green' ;
	}
}
function emailVerification(){
	var getPrompt = getForm.getElementsByClassName('pEmail')[0];
	if(getText3.value.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/)){
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green pEmail";
		getText3.className= 'input border_green' ;
	}
	else{
		getPrompt.innerHTML = "请输入正确的邮箱！";
		getPrompt.className = 'prompt text_red pEmail' ;
		getText3.className= 'input border_red' ;
	}
}
function phoneVerification(){
	var getPrompt = getForm.getElementsByClassName('pPhone')[0];
	if(getText4.value.match(/\d{11}/)){		
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green pPhone";
		getText4.className= 'input border_green' ;
	}
	else{
		getPrompt.innerHTML = "请输入正确的电话号码！"
		getPrompt.className = "prompt text_red pPhone";
		getText4.className= 'input border_red' ;
	}
} 

function allVerification(){
	if(getText0.className=='input border_green' && 
		getText1.className=='input border_green' && 
		getText2.className=='input border_green' && 
		getText3.className=='input border_green' &&
		getText4.className=='input border_green'){
		alert("验证成功！");
	}
	else{
		alert("验证失败！");
	}
}
function getLength(str){
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if(countCode > 0 && countCode < 128){
			count++;
		}
		else{
			count += 2;
		}
	};
	return count;
}
function init(){
	getText0.addEventListener('focus',function (e){createPrompt(e)});
	getText1.addEventListener('focus',function (e){createPrompt(e)});
	getText2.addEventListener('focus',function (e){createPrompt(e)});
	getText3.addEventListener('focus',function (e){createPrompt(e)});
	getText4.addEventListener('focus',function (e){createPrompt(e)});
	getText0.addEventListener('blur',nameVerification);
	getText1.addEventListener('blur',passVerification);
	getText2.addEventListener('blur',passSureVerification);
	getText3.addEventListener('blur',emailVerification);
	getText4.addEventListener('blur',phoneVerification);
	getSubmit.addEventListener('click',allVerification);
}
init();