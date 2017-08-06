const nameCharLimit = 20;

class Tab{
    constructor(name){
        this.active = false;
        this.html = this.createHTML(name); //will be an object with 4 props
    }
    
    setActive(state){
        this.active = !!state;
    }

    createHTML(nameStr){
        const self = this;

        const tab = document.createElement('li');
        if(nameStr != undefined && nameStr != '') tab.setAttribute('title', nameStr);
        tab.className = 'tab-box';
        tab.addEventListener('click', () => {
            //chama o editor relacionado
            console.log('TODO: Evento de ativação da aba!');
            TabManager.setActive(self);
        });
        tab.setAttribute('draggable', true);
        tab.addEventListener('dragstart', () => {
            //start tab dragging
        });
        tab.addEventListener('dragend', () => {
            //stop tab dragging
        });

        const icon = document.createElement('i');
        icon.className = 'fa fa-file-o';
        tab.appendChild(icon);

        const name = document.createElement('span');
        if(nameStr == undefined || nameStr == '') name.innerText = '(untitled)';
        else if(nameStr.length <= nameCharLimit) name.innerText = nameStr;
        else name.innerText = nameStr.substring(0, nameLimit-3) + '...';
        tab.appendChild(name);

        const close = document.createElement('i');
        close.className = 'btn-close fa fa-times-circle';
        close.setAttribute('title', 'Close');
        close.addEventListener('click', (ev) => {
            ev.stopPropagation();
            //start closing process
            console.log('TODO: Evento de fechamento!');
            self.destroyHTML();
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
        if(this.destroyed == undefined) this.destroyed = false;
        if(this.destroyed){
            console.error('Error: HTML for this tab was already removed.');
            return;
        }
        try{
            const index = TabManager.allTabs.indexOf(this);
            const self = this;
            this.html.tab.addEventListener("webkitAnimationEnd", () => {
                self.html.tab.parentNode.removeChild(self.html.tab);
                self.html = undefined;
                TabManager.allTabs.splice(index, 1);
            });
            this.html.tab.style.WebkitAnimation = 'closingtab 0.5s 1';
        } catch(e){
            console.error(e, e.stack);
        }
    }

    animationOpen(){
        if(this.html == undefined){
            console.error('Error: HTML for this tab does not exist.');
            return;
        }
        try{
            const self = this; //solves context conflicts
            self.html.tab.addEventListener('webkitAnimationStart', function cbStart(){
                //setActive(tab, tabElements);
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

    static setActive(tab){
        // Sets the only active tab
        for(let t of TabManager.allTabs){
            if(t === tab){
                t.setActive(true);
                $(t.html.tab).addClass('active');
            }
            else {
                t.setActive(false);
                $(t.html.tab).removeClass('active');
            }
        }
    }

    newTab(name){
        const t = new Tab(name);

        // Creates a new Tab, adding its HTML to the container
        if(TabManager.allTabs.length == 0) this.parentHTML.appendChild(t.html.tab);
        else this.parentHTML.insertBefore(t.html.tab, TabManager.allTabs[0].html.tab);
        TabManager.allTabs.unshift(t);

        this.expandWidth();
        TabManager.setActive(t);
        t.animationOpen();
    }

    //TODO: event -> destroyTab(){}

    getWidthOfAllTabs(){
        let width = 0;
        for(let t of TabManager.allTabs){
            width += $(t.html.tab).outerWidth();
        }
        return width;
    }

    expandWidth(){
        if(TabManager.allTabs.length == 0) return;
        const parentWidth = $(this.parentHTML).outerWidth();
        let minWidth = this.getWidthOfAllTabs();

        //Adds more width to the <ul>, if needed
        if(parentWidth < minWidth) {
            console.log(`parent: ${parentWidth} min: ${minWidth}`);
            this.parentHTML.style.width = minWidth + 'px';
        }
    }

}
TabManager.allTabs = [];


module.exports = TabManager;