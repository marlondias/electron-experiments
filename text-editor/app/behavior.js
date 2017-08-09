const TabManager = require('./tabManager.js');
const EditorManager = require('./editorManager.js');

const tabsRow = document.getElementById('tabs-row');
const tabs = document.getElementById('tabs');
const editors = document.getElementById('editor-box');
const tm = new TabManager(tabs);
const edm = new EditorManager(editors);


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
    tm.create(Symbol(), `sample${tabid++}.txt`);
    edm.newEditor();
});

window.addEventListener('activateTab', (ev) => {
    console.log('TODO: Evento de ativação da aba!');
    tm.setActive(ev.detail.id);
});

window.addEventListener('closeTab', (ev) => {
    console.log('TODO: Evento de fechamento!');
    tm.remove(ev.detail.id);
});
