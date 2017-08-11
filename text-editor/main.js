const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

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

    const template = [
        {
            label: 'File',
            submenu: [
                {
                    type: 'normal',
                    label: 'New File',
                    accelerator: 'CmdOrCtrl+N'
                },
                {
                    type: 'normal',
                    label: 'Open File...'
                },
                {
                    type: 'normal',
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S'
                },
                {
                    type: 'normal',
                    label: 'Save As...',
                    accelerator: 'CmdOrCtrl+Shift+S'
                },
                {
                    type: 'normal',
                    label: 'Revert File'
                },
                {
                    type: 'normal',
                    label: 'Close File',
                    accelerator: 'CmdOrCtrl+W'
                },
                {
                    type: 'separator'
                },
                {
                    type: 'normal',
                    label: 'Close Editor',
                    accelerator: 'CmdOrCtrl+Q'
                },
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'selectall'
                },
                {
                    type: 'separator'
                },
                {
                    type: 'normal',
                    label: 'Find...',
                    accelerator: 'CmdOrCtrl+F'
                },
                {
                    type: 'normal',
                    label: 'Find and Replace...',
                    accelerator: 'CmdOrCtrl+H'
                },
            ]
        },
        {
            label: 'Format',
            submenu: [
                {
                    type: 'checkbox',
                    label: 'Word Wrap'
                },
                {
                    type: 'submenu',
                    label: 'Encoding',
                    submenu: [
                        { label: 'ASCII' },
                        { label: 'UTF-8' },
                        { label: 'UTF-16' },
                    ]
                },
                {
                    type: 'submenu',
                    label: 'Line Ending',
                    submenu: [
                        { label: 'Windows' },
                        { label: 'Linux' },
                        { label: 'MacOS' },
                    ]
                }
            ]
        },
        {
            label: 'Extras',
            submenu: [
                {
                    type: 'submenu',
                    label: 'Themes',
                    submenu: [
                        { label: 'Light' },
                        { label: 'Dark' },
                        { label: 'H4ck3r' },
                    ]
                },
                {
                    type: 'normal',
                    label: 'About'
                }
            ]
        },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

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
