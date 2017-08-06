const TabManager = require('./tabManager.js');

const tabsRow = document.getElementById('tabs-row');
const tabs = document.getElementById('tabs');
const tm = new TabManager(tabs);

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



let tabid = 1;

//Bind events here...
document.getElementById('btn-tabs-add').addEventListener('click', () => {
    tm.newTab(`sample${tabid++}.txt`);
});

document.getElementById('btn-tabs-left').addEventListener('click', () => {
    console.log('TAB LEFT was clicked.');
});

document.getElementById('btn-tabs-right').addEventListener('click', () => {
    arrowRight(tabsRow, tabElements);
    console.log('TAB RIGHT was clicked.');
});
