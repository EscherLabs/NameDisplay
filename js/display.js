function ProcessParentMessage(message) {
	document.getElementById("person-info").innerHTML = message;
}

document.onkeydown = window.opener.ProcessChildMessage;
document.onkeypress = window.opener.ProcessChildMessage;
