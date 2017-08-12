const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const menuFunc = require('./app/menuFunctions.js');

let win; //window must be global to avoid GC

function createWindow(){
    win = new BrowserWindow({
        minWidth: 300,
        minHeight: 200,
        width: 1000,
        height: 600
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    menuFunc.setFileState(true);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuFunc.menuTemplate));

    win.on('closed', () => {
        //dereference any unused window objects
        win = null;
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    //something about MacOS behaviour
    if(win === null){
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        //exits application, except for macOS
        app.quit();
    }
});
