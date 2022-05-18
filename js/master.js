/* Configuration */
fields = [
    {name:'name', label: 'Diploma Name'}, 
    {name:'degree1', label: 'Degree 1'}, 
    {name:'degree2', label: 'Degree 2'},
    {name:'degree3', label: 'Degree 3'},
    {name:'degree4', label: 'Degree 4'},
    // {name:'last_name', label: 'Last Name'},
    // {name:'first_name', label: 'First Name'},
    // {name:'ceremony', label: 'Ceremony'},
    // {name:'school', label: 'School'},
    // {label: 'Force', type:'checkbox',show:false,truestate:'true',falsestate:'false',value:'false'}
];

var structuredFields = _.map(fields, Berry.normalizeItem);
var labels = _.map(structuredFields,'name')
var empty = _.zipObject(labels, _.map(labels, function() { return '';}))

template = `
<h1 {{#_longname}}class="shrinkname"{{/_longname}}>{{name}}</h1>
{{#degree1}}
    <h2 class="rotate{{_rotate}} {{#_longmajor1}}shrinkmajor{{/_longmajor1}} {{#_extralongmajor1}}supershrinkmajor{{/_extralongmajor1}}" id="rotate1of{{_rotate}}">
    {{degree1}}</h2>
{{/degree1}}
{{#degree2}}
    <h2 class="rotate{{_rotate}} {{#_longmajor2}}shrinkmajor{{/_longmajor2}} {{#_extralongmajor2}}supershrinkmajor{{/_extralongmajor2}}" id="rotate2of{{_rotate}}">
    {{degree2}}</h2>
{{/degree2}}
{{#degree3}}
    <h2 class="rotate{{_rotate}} {{#_longmajor3}}shrinkmajor{{/_longmajor3}} {{#_extralongmajor3}}supershrinkmajor{{/_extralongmajor3}}" id="rotate3of{{_rotate}}">
    {{degree3}}</h2>
{{/degree3}}
{{#degree4}}
    <h2 class="rotate{{_rotate}} {{#_longmajor4}}shrinkmajor{{/_longmajor4}} {{#_extralongmajor4}}supershrinkmajor{{/_extralongmajor4}}" id="rotate4of{{_rotate}}">
    {{degree4}}</h2>
{{/degree4}}`;
queueTemplate = `
<ul class="list-group">
    {{#.}}
    <li data-guid="{{guid}}" class="list-group-item">
        <div class="handle"></div>
        <span style="position:absolute;white-space:nowrap;overflow:hidden;right:10px;left:60px">
            {{name}} - {{degree1}}
        </span>
        <div class="btn btn-sm btn-danger parent-hover pull-right remove" style=";position:absolute;right:10px">
            <i class="fa fa-times"></i>
        </div>
        <div class="btn btn-sm btn-info parent-hover pull-right edit" style="position:absolute;right:50px">
            <i class="fa fa-pencil"></i>
        </div>
        <div class="btn btn-sm btn-warning parent-hover pull-right go" style="position:absolute;right:90px">
            <i class="fa fa-arrow-right"></i>
        </div>
    </li>
    {{/.}}
</ul>`;

/* End Configuration */

/* Helper Methods */

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

csvify = function(data, title) {
    var csv = '"'+_.map(structuredFields,'label').join('","')+'","Timestamp"\n';
    labels.push('timestamp');

    csv += _.map(data,function(d){
        return JSON.stringify(_.values(_.extend(empty,_.pick(d,labels))))
    },this)
    .join('\n') 
    .replace(/(^\[)|(\]$)/mg, '')
    .split('\"').join("")
 
    var link = document.createElement("a");
    link.setAttribute("href", 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute("download", (title||"history")+".csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
}

/* End Helper Methods */

/* Initialize */

displayQueue = Lockr.get('displayQueue') || [];
displayBuffer = Lockr.get('displayBuffer') || [];

var __CHILD_WINDOW_HANDLE = null;

__CHILD_WINDOW_HANDLE = window.open('display.html', 'displayname', 'width=720,height=427,left=200,top=100'); /* Screen height should be 405px + 22px for extra headers */
$("#open-display-btn, #fullscreen").on('click', function() {
    $("#open-display-btn").trigger('blur');
	__CHILD_WINDOW_HANDLE = window.open('display.html', 'displayname', 'width=720,height=427,left=200,top=100'); /* Screen height should be 405px + 22px for extra headers */
});

// document.getElementById('fullscreen').addEventListener('click', () => {
//     if (__CHILD_WINDOW_HANDLE !== null) {
//         __CHILD_WINDOW_HANDLE.ProcessParentMessage('fullscreen');
//     }
// });
document.addEventListener('contextmenu', event => event.preventDefault());

/* End Initialize */

/* Listen to Events from Display Window */
function ProcessChildMessage(e) { 
    if (e.type == 'keydown') {
        checkKey(e) 
    } else if (e.type == 'keypress') {
        read_qr_keypress(e)
    }
}
window.onbeforeunload = function() {
    return "";
}
/* Listen to Arrow Key, Enter Key Events */
function checkKey(e) {
    e = e || window.event;
    switch(e.keyCode){
    case 38: /* Up Arrow */
    case 40: /* Down Arrow */
    case 93: /* Menu Button (On Remote) */
        e.preventDefault();
        e.stopPropagation();        
        setDisplay({});
        break;
    case 39: /* Right Arrow */
        e.preventDefault()
        setDisplay(displayQueue.shift() || {})
        updateQueue();
        break;
    case 37: /* Left Arrow */
        e.preventDefault()
        var item = displayBuffer.shift();
        if(typeof item !== 'undefined'){
            displayQueue.unshift(item);
            updateQueue();
            var old = displayBuffer.shift();
            setDisplay(old || {});
        }else{
            setDisplay({});
        }
        break;
        /*FORM: uncomment to enable form*/

    // case 13: /* Enter Key */
    //     e.preventDefault();
    //     e.stopPropagation();        
    //     Berries.form.trigger('save');
    //     break;
    case 27: /* Escape Key */
        e.preventDefault();
        e.stopPropagation();        
        setDisplay({'name':'Binghamton University','degree1':'Class of 2022'});
        break;
    }			
}
document.onkeydown = checkKey;

/* Jump Queue */
$('body').on('click','.go',function(e) {
    setDisplay(_.remove(displayQueue,e.currentTarget.parentElement.dataset)[0] || {})
    updateQueue();
})

/* Remove Name From Queue */
$('body').on('click','.remove',function(e) {
    e.stopPropagation();
    _.remove(displayQueue,e.currentTarget.parentElement.dataset)
    updateQueue();
    Lockr.set('displayQueue',displayQueue); 
})

/* Edit Name in Queue */
$('body').on('click','.edit',function(e) {
    e.stopPropagation();
    var  editFields = [];
    $.extend(true, editFields,fields);
    editFields.push({name:'guid',type:'hidden'})
    $().berry({
        legend:'Edit Person info',
        attributes:_.find(displayQueue,e.currentTarget.parentElement.dataset),
        fields: editFields,
        actions: ['save']
    }).on('save',function() {
        $.extend(_.find(displayQueue,e.currentTarget.parentElement.dataset),this.toJSON())
        updateQueue();
        this.trigger('close');
    });
})

preprocess_data = function(data) {
    if (typeof data.name === 'undefined') {
        return data;
    }

    if (typeof data.degree1 === 'undefined' || data.degree1 === '') {
        data.degree1 = data.degree2;
        data.degree2 = data.degree3;
        data.degree3 = data.degree4;
    }
    if (typeof data.degree2 === 'undefined' || data.degree2 === '') {
        data.degree2 = data.degree3;
        data.degree3 = data.degree4;
    }
    if (typeof data.degree3 === 'undefined' || data.degree3 === '') {
        data.degree3 = data.degree4;
        data.degree4 = '';
    }

    if (data.name.length > 30) {
        data._longname = true;
    } else {data._longname = false;}
    if (typeof data.degree1 !== 'undefined' && data.degree1.length > 40 && data.degree1.length <= 67) {
        data._longmajor1 = true;
    } else {data._longmajor1 = false;}
    if (typeof data.degree2 !== 'undefined' && data.degree2.length > 40 && data.degree2.length <= 67) {
        data._longmajor2 = true;
    } else {data._longmajor2 = false;}
    if (typeof data.degree3 !== 'undefined' && data.degree3.length > 40 && data.degree3.length <= 67) {
        data._longmajor3 = true;
    } else {data._longmajor3 = false;}
    if (typeof data.degree4 !== 'undefined' && data.degree4.length > 40 && data.degree4.length <= 67) {
        data._longmajor4 = true;
    } else {data._longmajor4 = false;}
    if (typeof data.degree1 !== 'undefined' && data.degree1.length > 67) {
        data._extralongmajor1 = true;
    } else {data._extralongmajor1 = false;}
    if (typeof data.degree2 !== 'undefined' && data.degree2.length > 67) {
        data._extralongmajor2 = true;
    } else {data._extralongmajor2 = false;}
    if (typeof data.degree3 !== 'undefined' && data.degree3.length > 67) {
        data._extralongmajor3 = true;
    } else {data._extralongmajor3 = false;}
    if (typeof data.degree4 !== 'undefined' && data.degree4.length > 67) {
        data._extralongmajor4 = true;
    } else {data._extralongmajor4 = false;}

    
    if (typeof data.degree4 !== 'undefined' && data.degree4!=="") {
        data._rotate = 4;
    } else if (typeof data.degree3 !== 'undefined' && data.degree3!=="") {
        data._rotate = 3;
    } else if (typeof data.degree2 !== 'undefined' && data.degree2!=="") {
        data._rotate = 2;
    } 
    return data;
}

setDisplay = function(data) {
    if(typeof data.guid !== 'undefined'){
        data.timestamp = moment().format();
        displayBuffer.unshift(data);
    }
    data = preprocess_data(data);

    var rendered_text = Mustache.render(template, data);
    if (__CHILD_WINDOW_HANDLE !== null) {
        __CHILD_WINDOW_HANDLE.ProcessParentMessage(rendered_text);
    }
    $('#current-person-preview').html(rendered_text);
    Lockr.set('displayBuffer', displayBuffer);
}

updateQueue = function(item) {
    if(typeof item !== 'undefined'){
        var data = item;
        Berries.form.populate($.extend({},item, {name: '',force: 'false'}));

        data.guid = generateUUID();
        displayQueue.push(item);
    }
    var queueHTML = Mustache.render(queueTemplate, displayQueue);
    $('#upcoming-queue').html(queueHTML);
    var sortable = new Sortable($('ul')[0],{handle:'.handle',onSort: function (/**Event*/evt) {
		// same properties as onEnd
        var list = _.map($('ul li'),function(internal_item){
            return internal_item.dataset.guid
        })
        displayQueue = _.sortBy(displayQueue, function(internal_item){
            return list.indexOf(internal_item.guid)
        });
    }})
    // Update LocalStorage Last
    // if(typeof item !== 'undefined'){
        Lockr.set('displayQueue', displayQueue);
    // }
    if(typeof item !== 'undefined' && (item.force == 'true')){
        $('[data-guid="'+item.guid+'"]').find('.go').click()
    }
}

$('#myForm').berry({
    default:{columns:3},
    name:'form',
    inline:true,
    fields: fields,
    actions: false,
}).on('save',function() {
    // if(!_.every(this.toJSON(), _.isEmpty)){
        updateQueue(this.toJSON());
        this.$el.find('.form-control:first').focus();
    // }
});

function resetQueue() {
    if (confirm("Are you super duper sure you want to do this?  (It cannot be undone)")) {
        displayQueue = [];
        displayBuffer = [];
        updateQueue();
        setDisplay({})
    }
}

function downloadHistory() {
    csvify(displayBuffer);
}

updateQueue();