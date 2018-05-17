alert = function(content,status) {
    color = 'green';
    if (typeof status !== 'undefined') {
        if (status === 'success') {
            color = 'green';
        } else if (status === 'error') {
            color = 'red';
        }
    }
    $('.success-notification').css("background-color",color);
    $('.success-notification').html('<h1>'+content+'</h1>');
    $('.success-notification').show();
    setTimeout(function(){ 
        $('.success-notification').hide();
     }, 1000);
}

process_qr_code = function (content) {
    beep();
    try {
        var contentArray = content.split(',');
        var contentObj = {};
        _.each(structuredFields, function(field, index){
            contentObj[field.name] = contentArray[index];
        })
        alert(contentObj.first_name+" "+contentObj.last_name+"<h2>"+contentObj.degree+" "+contentObj.department+"</h2>",'success')
        updateQueue(contentObj);
    } catch (e) {
        alert('Error with Scan<br>Please Try Again','error')
    }
};

/* Physical QR Code Scanner */
read_char_buffer = false;
char_buffer = [];
read_qr_keypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr == "&") {
        evt.preventDefault();
        evt.stopPropagation();
        read_char_buffer = true;
        setTimeout(function(){ 
            if (read_char_buffer === true) {
                alert('Error with Scan<br>Please Try Again','error')
            }
            read_char_buffer = false; 
            char_buffer = []; 
        },300);
        return;
    } 
    if (read_char_buffer) {
        evt.preventDefault();
        evt.stopPropagation();
        if (charStr == "!") {
            read_char_buffer = false;
            process_qr_code(char_buffer.join(''))
            char_buffer = [];
            return;
        } else {
            char_buffer.push(charStr);
        }
    }
};

document.onkeypress = read_qr_keypress;
/* End Physical QR Code Scanner */

/* Optical / Camera QR Code Scanner */

let scanner = new Instascan.Scanner({ video: document.getElementById('video-preview'), scanPeriod: 10, refractoryPeriod: 1000});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        alert('No cameras found.','error');
    }
}).catch(function (e) {
    console.error(e);
});

scanner.addListener('scan', process_qr_code);

/* End Optical / Camera QR Code Scanner */
