
read_char_buffer = false;
char_buffer = [];
document.onkeypress = function(evt) {
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

