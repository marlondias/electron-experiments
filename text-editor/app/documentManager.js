const {dialog} = require('electron').remote;
const TabManager = require('./tabManager.js');
const EditorManager = require('./editorManager.js');

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
    constructor(tabContainer, editorContainer){
        if(!(tabContainer instanceof HTMLElement) || !(editorContainer instanceof HTMLElement)){
            throw new Error('Error initializing: Arguments must be of type HTMLElement.');
        }
        this.tabMngr = new TabManager(tabContainer);
        this.editorMngr = new EditorManager(editorContainer);
        this.allDocs = new Map(); // change to static?
    }

    createBlank(){
        // Creates a new Document, an unnamed Tab and an empty Editor.
        const doc = new Document();
        const fakeName = `sample-${tabid++}.txt`;
        this.tabMngr.create(doc.id, fakeName);
        this.editorMngr.create(doc.id);
        this.allDocs.set(doc.id, doc);
    }

    setActive(id){
        if(typeof id !== 'symbol' || !this.allDocs.has(id)) 
            throw new Error('Unable to close document: Invalid ID.');
        this.tabMngr.setActive(id);
        this.editorMngr.setActive(id);
    }

    open(filepath){
        // Tries to open a file and returns a new Document instance.
    }

    close(id){
        if(typeof id !== 'symbol' || !this.allDocs.has(id)) 
            throw new Error('Unable to close document: Invalid ID.');

        const target = this.allDocs.get(id);
        const self = this;
        function closeDoc(){
            // Close, remove and destroy
            self.tabMngr.remove(id);
            self.editorMngr.remove(id);
            self.allDocs.delete(id);
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

module.exports = DocManager;

// TODO: TabManager and EditorManager can be replaced by references in a Document instance,
// but it'll have to handle tab positioning.