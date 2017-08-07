(function(){

const statusBar = document.getElementById('status-bar');
const tabSelector = document.getElementById('tab-selector');
const editor = document.getElementById('editor-box');
const tabs = document.getElementById('tabs');

let oldWidth = window.innerWidth;
let oldHeight = window.innerHeight;

$(document).ready(function(){
    adaptHorizontally();
    adaptVertically();
});

window.addEventListener('resize', () => {
    if(window.innerWidth != oldWidth){
        adaptHorizontally();
        oldWidth = window.innerWidth;
    }
    if(window.innerHeight != oldHeight){
        adaptVertically();
        oldHeight = window.innerHeight;
    }
});

function adaptHorizontally(){

}

function adaptVertically(){
    changeEditorHeight();
}

function changeEditorHeight(){
    const winH = window.innerHeight;
    const statH = $(statusBar).outerHeight();
    const tabsH = $(tabSelector).outerHeight();
    const editH = $(editor).outerHeight();
    const offset = tabsH + statH;
    if(winH-offset != editH){
        editor.style.setProperty('height', (winH-offset) + 'px');
    }
}

})();