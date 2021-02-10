
// editor.trigger('keyboard', 'type', {text: "test"});

var command_button = document.getElementById("add-command");
var event_button = document.getElementById("add-event");

command_button.addEventListener("click", (e)=> {
    var command_select = document.getElementById("command");
    var command_arg = document.getElementById("command-arguement");

    // verify that the arguement is filled
    if(command_arg.value == ""){
        window.alert("Error - Please input an argument");
        return;
    }
    
    // create text to inject
    text = "api.add_message(new Command(\""+command_select.value+"\", \""+command_arg.value+"\"));\n";

    // inject text at current cursor position
    editor.trigger('keyboard', 'type', {text: text});
    console.log(text);

});

event_button.addEventListener("click", (e)=> {
    var event_select = document.getElementById("event-name");
    var event_arg = document.getElementById("event-arguement");

    // verify that the arguement is filled
    if(event_arg.value == ""){
        window.alert("Error - Please input an argument");
        return;
    }
    
    // create text to inject
    text = "api.add_message(new EventHandler(\""+event_select.value+"\", "+event_arg.value+"));\n";
            
    // inject text at current cursor position
    editor.trigger('keyboard', 'type', {text: text});
    console.log(text);

});

var help_button = document.getElementById("help");
help_button.addEventListener("click", (e) =>{
    console.log("help wanted");

    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    overlay.addEventListener("click", (e)=>{
        overlay.style.display = "none";
    });
});
