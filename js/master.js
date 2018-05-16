/* Configuration */
fields = [
    {label: 'First Name'}, 
    {label: 'Last Name'}, 
    {label: 'Degree'},
    {label: 'Department'},
    {label: 'Unique ID', type:'hidden'},
];

var structuredFields = _.map(fields, Berry.normalizeItem);
var labels = _.map(structuredFields,'name')
var empty = _.zipObject(labels, _.map(labels, function() { return '';}))

template = "<h1>{{first_name}} {{last_name}}</h1><h2>{{degree}} {{department}}</h2>";
queueTemplate = '<ul class="list-group">{{#.}}<li data-guid="{{guid}}" class="list-group-item"><div class="handle"></div>{{first_name}} {{last_name}} - {{degree}} {{department}}<div class="btn btn-sm btn-danger parent-hover pull-right remove"><i class="fa fa-times"></i></div><div class="btn btn-sm btn-info parent-hover pull-right edit" style="margin-right:10px"><i class="fa fa-pencil"></i></div><div class="btn btn-sm btn-warning parent-hover pull-right go" style="margin-right:10px"><i class="fa fa-arrow-right"></i></div></li>{{/.}}</ul>';

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
$("#open-display-btn").on('click', function() {
    $("#open-display-btn").trigger('blur');
	__CHILD_WINDOW_HANDLE = window.open('display.html', '_blank', 'width=700,height=500,left=200,top=100');
});

/* End Initialize */

/* Listen to Events from Display Window */
function ProcessChildMessage(e) { 
    if (e.type == 'keydown') {
        checkKey(e) 
    } else if (e.type == 'keypress') {
        read_qr_keypress(e)
    }
}

/* Listen to Arrow Key, Enter Key Events */
function checkKey(e) {
    e = e || window.event;
    switch(e.keyCode){
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
    case 13: /* Enter Key */
        e.preventDefault();
        e.stopPropagation();        
        Berries.form.trigger('save');
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

setDisplay = function(data) {
    if(typeof data.guid !== 'undefined'){
        data.timestamp = moment().format();
        displayBuffer.unshift(data);
    }
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
        Berries.form.populate($.extend({},item, {first_name: '',last_name: '',unique_id: ''}));
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
    if(typeof item !== 'undefined'){
        Lockr.set('displayQueue', displayQueue);
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
    displayQueue = [];
    displayBuffer = [];
    updateQueue();
    setDisplay({})
}

function downloadHistory() {
    csvify(displayBuffer);
}

updateQueue();