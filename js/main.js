let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

scanner.addListener('scan', function (content) {
    toastr.info('QR Code Scanned')
    console.log(content);
    try {
        person_info = JSON.parse(content)
        update_screen(person_info);
        // setTimeout(function(){
        //     toastr.info('Reverting Back to Default (Demo Mode)')
        //     update_screen({"name":"{{name}}","major":"{{major}}"})
        // }, 5000);
    } catch (e) {
        toastr.error('Error with QR Code')
    }
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        toastr.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

update_screen = function(person_info) {
    toastr.success('Updating Person Info')
    var rendered_text = Mustache.render("<h1>{{name}}</h1><h2>{{major}}</h2>", person_info);
    document.getElementById("person-info").innerHTML = rendered_text;    
}

toastr.options = {
    "positionClass": "toast-top-left",
    "timeOut": "2000",
}

update_screen({"name":"{{name}}","major":"{{major}}"})