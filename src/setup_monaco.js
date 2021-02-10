require.config({
    paths: {
        'vs': 'https://unpkg.com/monaco-editor@latest/min/vs'
    }
});
window.MonacoEnvironment = {
    getWorkerUrl: () => proxy
};
let proxy = URL.createObjectURL(new Blob([`
self.MonacoEnvironment = {
    baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
};
importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], {
    type: 'text/javascript'
}));

var editor;

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('container'), {
        value: 
`const api = new MinecraftAPIClient();

var block_broken_command = function(response) {
    console.log(response)
}

var event = new EventHandler("BlockBroken", block_broken_command) 
api.add_message(event);

api.start()
        `,
        language: 'javascript',
        theme: 'vs-dark'
    });
});

document.getElementById("run").addEventListener("click", (event) => {

    // obtain the script from the editor    
    var code =
        `
        <script type='module'>
        import {MinecraftAPIClient} from '../static/minecraft_api.js';
        import {EventHandler} from '../static/event.js';
        import {Command} from '../static/command.js';
        `+
        editor.getValue() +
        "</script>"

    // reset the output
    document.getElementById("output").innerHTML = "";

    // We embed the code into an iframe to run it //
    var iframe = document.createElement('iframe');
    iframe.style.display = "none";
    iframe.setAttribute("srcdoc", code);

    // Attach the code 
    document.body.appendChild(iframe);
});

// This function handles the iframe sending errors to the parent //
window.addEventListener('attachEvent', () => {
    // Since there are many messages we limit it to only the attachEvent ones //
    window.addEventListener('message', (event) => {
        const {output} = event;
        document.getElementById("output").innerHTML += output;
    })
});