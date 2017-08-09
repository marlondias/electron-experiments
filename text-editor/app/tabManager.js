const nameCharLimit = 20; // The maximum lenght of a tab title

class Tab{
    constructor(id, name){
        this.id = id;
        this.active = false;
        this.html = this.createHTML(name); //will be an object with 4 props
    }
    
    setActive(state){
        // Sets this tab as active, changing the HTML class
        if(this.state == !!state) return;
        this.active = !!state;
        if(this.active) $(this.html.tab).addClass('active');
        else $(this.html.tab).removeClass('active');
    }

    createHTML(nameStr){
        const self = this;

        // Tab is created as a <li>
        const tab = document.createElement('li');
        if(nameStr != undefined && nameStr != '') tab.setAttribute('title', nameStr);
        tab.className = 'tab-box';
        tab.addEventListener('click', () => {
            // Raises the event for focus
            const event = new CustomEvent('activateTab', {
                bubbles: true,
                detail: { 'id': self.id }
            });
            self.html.tab.dispatchEvent(event);
        });
        tab.setAttribute('draggable', true);
        tab.addEventListener('dragstart', () => { /* start tab dragging */ });
        tab.addEventListener('dragend', () => { /* stop tab dragging */ });

        // Icon is created as an <i> using FontAwesome
        const icon = document.createElement('i');
        icon.className = 'fa fa-file-o';
        tab.appendChild(icon);

        // Title is created as a <span> with text (max size is a constant)
        const name = document.createElement('span');
        if(nameStr == undefined || nameStr == '') name.innerText = '(untitled)';
        else if(nameStr.length <= nameCharLimit) name.innerText = nameStr;
        else name.innerText = nameStr.substring(0, nameLimit-3) + '...';
        tab.appendChild(name);

        // Close button is created as an <i> using FontAwesome
        // It captures click events, preventing double behavior
        const close = document.createElement('i');
        close.className = 'btn-close fa fa-times-circle';
        close.setAttribute('title', 'Close');
        close.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const event = new CustomEvent('closeTab', {
                bubbles: true,
                detail: { 'id': self.id }
            });
            self.html.close.dispatchEvent(event);
        });
        tab.appendChild(close);

        return {
            "tab": tab,
            "icon": icon,
            "text": name,
            "close": close
        };
    }

    destroyHTML(){
        // Removes <li> element for this tab, and triggers some animation
        if(this.destroyed == undefined) this.destroyed = false;
        if(this.destroyed){
            console.error('Error: HTML for this tab was already removed.');
            return;
        }
        try{
            const self = this;
            this.html.tab.addEventListener("webkitAnimationEnd", () => {
                self.html.tab.parentNode.removeChild(self.html.tab);
                self.html = undefined;
                self.destroyed = true;
            });
            this.html.tab.style.WebkitAnimation = 'closingtab 0.5s 1';
        } catch(e){
            console.error(e, e.stack);
        }
    }

    animationOpen(){
        // Executes CSS animation for this tab, if possible
        if(this.html == undefined){
            console.error('Error: HTML for this tab does not exist.');
            return;
        }
        try{
            const self = this;
            self.html.tab.addEventListener('webkitAnimationStart', function cbStart(){
                self.html.tab.removeEventListener('webkitAnimationStart', cbStart);
            });
            self.html.tab.addEventListener('webkitAnimationEnd', function cbEnd(){
                self.html.tab.style.WebkitAnimation = '';
                self.html.tab.removeEventListener('webkitAnimationEnd', cbEnd);
            });
            self.html.tab.style.WebkitAnimation = 'openingtab 0.3s 1';
        } catch(e){
            console.error(e, e.stack);
        }
    }
}


class TabManager{
    constructor(parent){
        this.parentHTML = parent;
    }

    setActive(id){
        // Searches for the tab with ID and sets it as the only active tab in the <ul>.
        // If the ID is not found, the target will be 'undefined' and all tabs will be
        // disabled.
        if(typeof id !== 'symbol' || !this.has(id)) return;
        const tab = this.find(id);
        for(let t of TabManager.all){
            if(t === tab) t.setActive(true);
            else t.setActive(false);
        }
    }

    find(id){
        // Returns the desired Tab, or UNDEFINED.
        if(typeof id === 'symbol'){
            for(let t of TabManager.all){
                if(t.id === id) return t;
            }
        }
        return undefined;
    }

    has(id){
        // Checks if the ID is already in use, returns boolean.
        if(typeof id === 'symbol'){
            for(let t of TabManager.all){
                if(t.id === id) return true;
            }
        }
        return false;
    }

    create(id, name){
        // Creates a new Tab and adds its HTML to the container
        if(typeof id !== 'symbol') throw new Error('Error creating tab: Type of ID is not supported.');
        if(this.has(id)) throw new Error('Error creating tab: ID is already registered.');
        if(typeof name !== 'string') throw new Error('Error creating tab: Type of NAME is not supported.');

        const t = new Tab(id, name);
        if(TabManager.all.length == 0) this.parentHTML.appendChild(t.html.tab);
        else this.parentHTML.insertBefore(t.html.tab, TabManager.all[0].html.tab);
        TabManager.all.unshift(t);
        
        this.expandWidth();
        this.setActive(id);
        t.animationOpen();
    }

    remove(id){
        // Removes the Tab object and its HTML, returns a boolean
        if(typeof id === 'symbol' && this.has(id)){
            try{
                const t = this.find(id);
                const index = TabManager.all.indexOf(t);
                t.destroyHTML();
                TabManager.all.splice(index, 1);
                return true;
            } catch(e){
                console.error(e);
                return false;
            }
        }
        return false;        
    }

    getWidthOfAllTabs(){
        let width = 0;
        for(let t of TabManager.all){
            width += $(t.html.tab).outerWidth();
        }
        return width;
    }

    expandWidth(){
        if(TabManager.all.length == 0) return;
        const parentWidth = $(this.parentHTML).outerWidth();
        let minWidth = this.getWidthOfAllTabs();

        //Adds more width to the <ul>, if needed
        if(parentWidth < minWidth) {
            console.log(`parent: ${parentWidth} min: ${minWidth}`);
            this.parentHTML.style.width = minWidth + 'px';
        }
    }
}
TabManager.all = [];


module.exports = TabManager;


function arrowLeft(){
    //Slides the tabs to the left until the "leftiest" tabs is fully visible
}

function arrowRight(tRow, tabsArray){
    //Slides the tabs to the right until the "rightiest" tabs is fully visible

    //Check if all tabs fit the area
    //const rowWidth = $(tRow).width();
    //const minWidth = getWidthOfTabs(tabsArray);
    //if(rowWidth > minWidth) return;

    //console.log('Make the DIV great again!');

    //If there is a hidden tab in the right edge, slide the others to the left
}