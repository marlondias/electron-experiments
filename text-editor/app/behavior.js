const DocumentManager = require('./documentManager.js');

const tabsRow = document.getElementById('tabs-row');
const tabs = document.getElementById('tabs');
const editors = document.getElementById('editor-box');
const docMan = new DocumentManager(tabs, editors);


//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    const event = new CustomEvent('newBlankTab', {
        detail: "nothing yet"
    });
    this.dispatchEvent(event);
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    const event = new CustomEvent('moveTabLeft', {
        detail: "nothing yet"
    });
    this.dispatchEvent(event);
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    const event = new CustomEvent('moveTabRight', {
        detail: "nothing yet"
    });
    this.dispatchEvent(event);
});


window.addEventListener('moveTabLeft', () => {
    console.log('TAB LEFT was clicked.');
});

window.addEventListener('moveTabRight', () => {
    console.log('TAB RIGHT was clicked.');
});

let tabid = 1;
window.addEventListener('newBlankTab', () => {
    // Check for how many files are open. If there are too many, cancel the operation.
    // Create a new Document, Tab and Editor. Make sure they are strongly related.
    console.log('EVENTO: Nova aba em branco.');
    docMan.createBlank();
});

window.addEventListener('activateTab', (ev) => {
    console.log('EVENTO: Ativação de aba.');
    const target = ev.detail.id;
    docMan.setActive(target);
});

window.addEventListener('closeTab', (ev) => {
    console.log('EVENTO: Fechamento de aba.');
    const target = ev.detail.id;
    docMan.close(target);
});
