function ProcessParentMessage(message) {
	if(message == 'fullscreen'){
		if (screenfull.enabled) {
			screenfull.request();
		}
	}else{
		// document.getElementById("person-info").innerHTML = message;		
	}
}

document.onkeydown = window.opener.ProcessChildMessage;
document.onkeypress = window.opener.ProcessChildMessage;
