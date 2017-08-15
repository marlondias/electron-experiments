const eventEmitter = require('electron').ipcRenderer;
const DocManager = require('./documentManager.js');

const tabsRow = document.getElementById('tabs-row');
const tabs = document.getElementById('tabs');
const editors = document.getElementById('editor-box');
DocManager.initHTML(tabs, editors);

//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    eventEmitter.emit('newFile', {
        origin: 'plusButton'
    });
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    eventEmitter.emit('slideTabs', {
        origin: 'chevronButton',
        direction: 'left'
    });
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    eventEmitter.emit('slideTabs', {
        origin: 'chevronButton',
        direction: 'right'
    });
});

eventEmitter.on('slideTabs', (info) => {
    //Placeholder listener
    console.log(`Button slide ${info.direction} was clicked.`);
});
