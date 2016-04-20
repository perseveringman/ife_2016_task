var getForm = document.getElementById('form_name');
var getText = getForm.getElementsByClassName("name")[0];
var getSubmit = document.getElementById("button");
function verification(){
	var getValue = getText.value;
	var length = getLength(getValue);
	var getPrompt = getForm.getElementsByClassName('prompt')[0];
	if(!length){
		getPrompt.innerHTML = "姓名不能为空！";
		getPrompt.className += ' text_red' ;
		getText.className+= ' border_red' ;
	}
	else if(length < 4 || length > 16){
		getPrompt.className = 'prompt text_red' ;
		getText.className= 'name border_red' ;
	}
	else {
		getPrompt.innerHTML = "输入正确"
		getPrompt.className = "prompt text_green";
		getText.className= 'name border_green' ;
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
	getSubmit.addEventListener('click',verification);
}
init();
