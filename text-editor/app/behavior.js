const ps = require('electron').remote.require('electron-pubsub');
const DocManager = require('./documentManager.js');

const tabsRow = document.getElementById('tabs-row');
const tabs = document.getElementById('tabs');
const editors = document.getElementById('editor-box');
DocManager.initHTML(tabs, editors);

//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    ps.publish('newFile', {
        origin: 'plusButton'
    });
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    ps.publish('slideTabs', {
        origin: 'chevronButton',
        direction: 'left'
    });
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    ps.publish('slideTabs', {
        origin: 'chevronButton',
        direction: 'right'
    });
});


ps.subscribe('slideTabs', (ev, info) => {
    //Placeholder listener
    console.log(`Button slide ${info.direction} was clicked.`);
});
