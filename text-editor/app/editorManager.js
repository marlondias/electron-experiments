class Editor{
    constructor(){
        this.active = false;
        this.html = this.createHTML();
    }

    setActive(state){
        // Sets this editor as active, changing the HTML class
        this.active = !!state;
        if(this.active) $(this.html.editor).addClass('active');
        else $(this.html.editor).removeClass('active');
    }

    createHTML(){
        // Editor is created as a <div>
        const editor = document.createElement('div');
        editor.className = 'editor';

        // Line counter is created as an <ul>
        /*
        const lc = document.createElement('ul');
        lc.className = 'counter';
        for(let i=1; i < 16; i++){
            //Placeholder
            const item = document.createElement('li');
            item.innerText = i;            
            lc.appendChild(item);
        }
        editor.appendChild(lc);
        */

        // Text area is created as a <div>
        const txtArea = document.createElement('div');
        txtArea.className = 'text';
        editor.appendChild(txtArea);

        return {
            "editor": editor,
            "textArea": txtArea
        };
    }
}

class EditorManager{
    constructor(parent){
        this.parentHTML = parent;
    }

    static setActive(editor){
        // Sets TAB as the only active tab in the <ul>
        for(let ed of EditorManager.all){
            if(ed === editor) ed.setActive(true);
            else ed.setActive(false);
        }
    }

    newEditor(){
        const ed = new Editor();

        // Creates a new Editor, adding its HTML to the container
        this.parentHTML.appendChild(ed.html.editor);
        EditorManager.all.push(ed);

        EditorManager.setActive(ed);
    }

    //TODO: event -> destroyEditor(){}
}
EditorManager.all = [];

module.exports = EditorManager;