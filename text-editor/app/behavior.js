class Document{
    constructor(name, file){
        this.id = new Symbol();
        this.name = name;
        this.file = file;
    }

    get id(){
        return this.id;
    }

    get name(){
        if(this.name == undefined) return "(untitled)";
        return this.name;
    }

    get file(){
        return this.file;
    }
}


const tabs = document.getElementById('tabs');
let tabid = 1;
const tabElements = []; //tab position follows array index

function createTab(newName, newTarget){
    const nameLimit = 20;

    const tab = document.createElement('li');
    tab.className = 'tab-box';
    if(newName != undefined && newName != '') tab.setAttribute('title', newName);
    tab.addEventListener('click', () => {
        //chama o editor relacionado
        console.log('Pretend that the editor pane has changed.');
    });
    tab.setAttribute('draggable', true);
    tab.addEventListener('dragstart', () => {
        //start tab dragging
        //change some style
        console.log('Drag is on...');
    });
    tab.addEventListener('dragend', () => {
        //stop tab dragging
        //revert some style
        console.log('Drag is off.');
    });

    const icon = document.createElement('i');
    icon.className = 'fa fa-file-o';
    tab.appendChild(icon);

    const name = document.createElement('span');
    if(newName == undefined || newName == '') name.innerText = '(untitled)';
    else if(newName.length <= nameLimit) name.innerText = newName;
    else{
        name.innerText = newName.substring(0, nameLimit-3) + '...';
    }
    tab.appendChild(name);

    const close = document.createElement('i');
    close.className = 'btn-close fa fa-times-circle';
    close.setAttribute('title', 'Close');
    close.addEventListener('click', (ev) => {
        ev.stopPropagation();
        //start closing process
        console.log('Why do you want to kill me?');

        destroyTab(tab);
    });
    tab.appendChild(close);

    //Adds the new tab to the array and to the <ul>
    if(tabElements.length == 0) tabs.appendChild(tab);
    else {
        tabs.insertBefore(tab, tabElements[0]);
    }
    tabElements.unshift(tab);


    //Recalculate <ul> width, if needed
    const tWidth = $(tab).outerWidth();
    let newFullWidth = $(tabs).outerWidth();
    if(newFullWidth)

    tab.addEventListener('webkitAnimationStart', function callback(){
        setActiveTab(tab);
        tab.removeEventListener('webkitAnimationStart', callback);
    });
    tab.addEventListener('webkitAnimationEnd', function callback(){
        tab.style.WebkitAnimation = '';
        tab.removeEventListener('webkitAnimationEnd', callback);
    });
    tab.style.WebkitAnimation = 'openingtab 0.3s 1';

    



}

function destroyTab(element){
    //No need to remove listeners because the element will die
    element.addEventListener("webkitAnimationStart", () => {});
    element.addEventListener("webkitAnimationEnd", () => {
        try{
            element.parentNode.removeChild(element);
            tabElements.splice(tabElements.indexOf(element), 1);
        } catch(ex){
            console.error('Error while removing <li> node.');
        }
    });
    element.style.WebkitAnimation = 'closingtab 0.5s 1';
}

function setActiveTab(element){
    //Add class 'active' to this element only
    for(let t of tabElements){
        $(t).removeClass('active');
    }
    $(element).addClass('active');
    console.log('Active tab has changed!');
}


//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    createTab(`sample${tabid++}.txt`);
    console.log('ADD TAB was clicked.');
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    console.log('TAB LEFT was clicked.');
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    console.log('TAB RIGHT was clicked.');
});
