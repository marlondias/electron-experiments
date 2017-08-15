const ipc = require('electron').ipcRenderer;
const DocManager = require('./documentManager.js');

const tabs = document.getElementById('tabs');
const editors = document.getElementById('editor-box');
DocManager.initHTML(tabs, editors);

//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    ipc.emit('newFile', {
        origin: 'plusButton'
    });
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    ipc.emit('slideTabs', {
        origin: 'chevronButton',
        direction: 'left'
    });
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    ipc.emit('slideTabs', {
        origin: 'chevronButton',
        direction: 'right'
    });
});

