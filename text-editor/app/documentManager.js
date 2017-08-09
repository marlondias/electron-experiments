const TabManager = require('./tabManager.js');
const EditorManager = require('./editorManager.js');
let tabMngr, editorMngr;
const allDocs = new Map();

class Document{
    constructor(file){
        this.id = new Symbol();
        this.file = file;
        this.modified = false;
    }

    setContent(){}

    
}


function init(tabContainer, editorContainer){
    if(!(tabContainer instanceof HTMLElement) || !(editorContainer instanceof HTMLElement)){
        throw new Error('Error initializing: Arguments must be of type HTMLElement.');
    }
    tabMngr = new TabManager(tabContainer);
    editorMngr = new EditorManager(editorContainer);
}

function newBlank(){
    // Creates a new Document, an unnamed Tab and an empty Editor.
    const doc = new Document();
    tabMngr.create(doc.id);
    editorMngr.create(doc.id);
    allDocs.set(doc.id, doc);
}

function open(filepath){
    // Tries to open a file and returns a new Document instance.
}

function save(){
    // Saves an existing document to the original file.
}

function saveAs(){
    // Asks for the a new name and location for the file.
}

function close(id){
    if(typeof id !== 'symbol') throw new Error('Error closing document: Type of ID is not supported.');
    if(!allDocs.has(id)) throw new Error('Error closing document: There is no document with this ID.');

    const target = allDocs.get(id);
    if(target.modified){
        // Asks if the user wants to discard changes...
        console.log('TODO: Documento modificado.');
        return;
    }

    // Close, remove and destroy
    tabMngr.remove(id);
    editorMngr.remove(id);
    allDocs.delete(id);
}
