const {dialog} = require('electron').remote;
const TabManager = require('./tabManager.js');
const EditorManager = require('./editorManager.js');
const ps = require('electron').remote.require('electron-pubsub');

class Document{
    constructor(file){
        this.id = Symbol();
        this.file = file;
        this.name = 'A placeholder.js';
        this.modified = true;
    }

    setContent(){}

    save(filepath){
        // Saves an existing document to the original file.
        if(filepath == undefined){
            // Try to save using 'this.file'
        }
        else{
            // Try to save using 'filepath'
        }
    }

    saveAs(){
        // Asks for the a new name and location for the file.
        // Changes the FILEPATH to the new version
        // Changes the name in the tab to the new version
    }
    
    close(){}
}

let tabid = 1;

class DocManager{
    static initHTML(tabContainer, editorContainer){
        if(!(tabContainer instanceof HTMLElement) || !(editorContainer instanceof HTMLElement)){
            throw new Error('Error initializing: Arguments must be of type HTMLElement.');
        }
        DocManager.tabMngr = new TabManager(tabContainer);
        DocManager.editorMngr = new EditorManager(editorContainer);
    }

    static createBlank(){
        if(DocManager.tabMngr == undefined || DocManager.editorMngr == undefined) 
            throw new Error('Unable to create document: HTML containers must be defined first.');

        // Creates a new Document, an unnamed Tab and an empty Editor.
        const doc = new Document();
        const fakeName = `sample-${tabid++}.txt`;
        DocManager.tabMngr.create(doc.id, fakeName);
        DocManager.editorMngr.create(doc.id);
        DocManager.allDocs.set(doc.id, doc);
    }

    static setActive(id){
        if(DocManager.tabMngr == undefined || DocManager.editorMngr == undefined) 
            throw new Error('Unable to create document: HTML containers must be defined first.');

        if(typeof id !== 'symbol' || !DocManager.allDocs.has(id)) 
            throw new Error('Unable to close document: Invalid ID.');

        DocManager.tabMngr.setActive(id);
        DocManager.editorMngr.setActive(id);
    }

    static open(filepath){
        if(DocManager.tabMngr == undefined || DocManager.editorMngr == undefined) 
            throw new Error('Unable to create document: HTML containers must be defined first.');

        // Tries to open a file and returns a new Document instance.
    }

    static close(id){
        if(DocManager.tabMngr == undefined || DocManager.editorMngr == undefined) 
            throw new Error('Unable to create document: HTML containers must be defined first.');

        if(typeof id !== 'symbol' || !DocManager.allDocs.has(id)) 
            throw new Error('Unable to close document: Invalid ID.');

        const target = DocManager.allDocs.get(id);
        function closeDoc(){
            // Close, remove and destroy
            DocManager.tabMngr.remove(id);
            DocManager.editorMngr.remove(id);
            DocManager.allDocs.delete(id);
        }
        if(!target.modified){
            closeDoc();
            return;
        }

        // Asks if the user wants to save changes, in 2 possible ways
        if(target.file == undefined){
            dialog.showMessageBox(
                {
                    type: 'warning',
                    title: 'Unsaved file',
                    message: `The file was modified. Do you want to save the file?`,
                    buttons: ['Yes', 'No', 'Cancel'],
                    defaultId: 0,
                    cancelId: 2
                },
                (response) => {
                    if(response === 0) {
                        dialog.showSaveDialog({ title: 'Save file'}, (response) => {
                            if(response == undefined) return;
                            console.log(`Imagine que salvou em ${response}`);
                            //TODO: get file path and save the file
                            closeDoc();
                        });
                    }
                    else if(response === 1) closeDoc();
                    else return;
                }
            );
        }
        else{
            dialog.showMessageBox(
                {
                    type: 'warning',
                    title: 'Unsaved changes',
                    message: `The file "${target.name}" was modified. Do you want to save the changes?`,
                    buttons: ['Yes', 'No', 'Cancel'],
                    defaultId: 0,
                    cancelId: 2
                },
                (response) => {
                    if(response === 0) {
                        console.log(`Imagine que salvou em ${target.file}`);
                        //TODO: get file path and save the file
                        closeDoc();
                    }
                    else if(response === 1) closeDoc();
                    else return;
                }
            );
        }
    }
}
DocManager.allDocs = new Map();

module.exports = DocManager;

/*
newFile
openFile
saveFile
saveFileAs
revertFile
closeFile

closeEditor
showAbout
slideTabs (direction)
focusTab (id)
*/

ps.subscribe('newFile', (ev, info) => {
    // Create a new Document, Tab and Editor. Make sure they are strongly related.
    console.log('EVENTO: Novo documento. Origem: ' + info.origin);
    DocManager.createBlank();
});

ps.subscribe('openFile', (ev, info) => {});
ps.subscribe('saveFile', (ev, info) => {});
ps.subscribe('saveFileAs', (ev, info) => {});
ps.subscribe('revertFile', (ev, info) => {});

ps.subscribe('closeFile', (ev, info) => {
    // Tries to close the Document, warning if there are unsaved changes.
    // If the event does not have an ID, the currently active document will be closed.
    console.log('EVENTO: Fechamento de aba. Origem: ' + info.origin);

    if(!info.hasOwnProperty('docID') || info.docID == undefined){
        console.log('Sem ID. Fechar ativo.');
    }
    else{
        console.log(info.docID);
    }
});


ps.subscribe('focusTab', (ev, info) => {
    // Sets the active document (editor and tab). Only works with an ID.
    console.log('EVENTO: Ativação de aba. Origem: ' + info.origin);

    if(!info.hasOwnProperty('docID') || info.docID == undefined) return;
    DocManager.setActive(info.docID);
});


// TODO: TabManager and EditorManager can be replaced by references in a Document instance,
// but it'll have to handle tab positioning.