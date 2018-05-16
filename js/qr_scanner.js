toastr.options = {
    "positionClass": "toast-top-left",
    "timeOut": "2000",
}

process_qr_code = function (content) {
    toastr.info('QR Code Scanned')
    beep();
    try {
        var contentArray = content.split(',');
        var contentObj = {};
        _.each(structuredFields, function(field, index){
            contentObj[field.name] = contentArray[index];
        })
        updateQueue(contentObj);
    } catch (e) {
        toastr.error('Error with QR Code')
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
        setTimeout(function(){ read_char_buffer = false; char_buffer = []; },200);
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
        toastr.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

scanner.addListener('scan', process_qr_code);

/* End Optical / Camera QR Code Scanner */
