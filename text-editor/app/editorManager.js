class Editor{
    constructor(id){
        this.id = id;
        this.active = false;
        this.html = this.createHTML();
    }

    setActive(state){
        // Sets this tab as active, changing the HTML class
        if(this.state == !!state) return;
        this.active = !!state;
        if(this.active) $(this.html.editor).addClass('active');
        else $(this.html.editor).removeClass('active');
    }

    createHTML(){
        // Editor is created as a <div>
        const editor = document.createElement('div');
        editor.className = 'editor';

        // Text area is created as a <div>
        const txtArea = document.createElement('div');
        txtArea.className = 'text';
        editor.appendChild(txtArea);

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

        return {
            "editor": editor,
            "textArea": txtArea
            /* "counter": lc */
        };
    }

    destroyHTML(){
        // Removes <div> element for this editor.
        if(this.destroyed == undefined) this.destroyed = false;
        if(this.destroyed){
            console.error('Error: HTML for this editor was already removed.');
            return;
        }
        try{
            this.html.editor.parentNode.removeChild(this.html.editor);
            this.html = undefined;
            this.destroyed = true;
        } catch(e){
            console.error(e, e.stack);
        }
    }
}


class EditorManager{
    constructor(parent){
        this.parentHTML = parent;
    }

    setActive(id){
        // Searches for the editor with ID and sets it as the only active/visible editor.
        // If the ID is not found, the target will be 'undefined' and all tabs will be
        // disabled.
        if(typeof id !== 'symbol' || !this.has(id)) return;
        const editor = this.find(id);
        for(let e of EditorManager.all){
            if(e === editor) e.setActive(true);
            else e.setActive(false);
        }
    }

    find(id){
        // Returns the desired Editor, or UNDEFINED.
        if(typeof id === 'symbol'){
            for(let e of EditorManager.all){
                if(e.id === id) return e;
            }
        }
        return undefined;
    }

    has(id){
        // Checks if the ID is already in use, returns boolean.
        if(typeof id === 'symbol'){
            for(let e of EditorManager.all){
                if(e.id === id) return true;
            }
        }
        return false;
    }

    create(id){
        // Creates a new Editor, adding its HTML to the container
        if(typeof id !== 'symbol') throw new Error('Error creating editor: Type of ID is not supported.');
        if(this.has(id)) throw new Error('Error creating editor: ID is already registered.');
        const ed = new Editor(id);
        this.parentHTML.appendChild(ed.html.editor);
        EditorManager.all.push(ed);
        this.setActive(id);
    }

    remove(id){
        // Removes the Editor object and its HTML, returns a boolean
        if(typeof id === 'symbol' && this.has(id)){
            try{
                const ed = this.find(id);
                const index = EditorManager.all.indexOf(ed);
                ed.destroyHTML();
                EditorManager.all.splice(index, 1);
                return true;
            } catch(e){
                console.error(e);
                return false;
            }
        }
        return false;
    }
}
EditorManager.all = [];


module.exports = EditorManager;