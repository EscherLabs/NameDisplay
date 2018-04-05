function ProcessParentMessage(message) {
	document.getElementById("person-info").innerHTML = message;
}

schools = {
	66:'display.css', //'b'
	67:'cortland.css' //'c'
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (typeof schools[e.keyCode] !== undefined) {
		e.preventDefault()
		var fileref = document.createElement("link");
		fileref.rel = "stylesheet";
		fileref.type = "text/css";
		fileref.href = "css/"+schools[e.keyCode];
		fileref.id = 'school_style';
		$('#school_style').remove();
		$('body').append(fileref);
		// document.getElementsByClassName("school_style").remove();
		// document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}