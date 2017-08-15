const {Menu, MenuItem} = require('electron');
const eventEmitter = require('electron').ipcMain;

const saveF = new MenuItem({
    type: 'normal',
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    enabled: false,
    click: () => {
        eventEmitter.emit('saveFile', {
            origin: 'mainmenu'
        });
    }
});

const saveAsF = new MenuItem({
    type: 'normal',
    label: 'Save As...',
    accelerator: 'CmdOrCtrl+Shift+S',
    enabled: false,
    click: () => {
        eventEmitter.emit('saveFileAs', {
            origin: 'mainmenu'
        });
    }
});

const revertF = new MenuItem({
    type: 'normal',
    label: 'Revert File',
    enabled: false,
    click: () => {
        eventEmitter.emit('revertFile', {
            origin: 'mainmenu'
        });
    }
});

const closeF = new MenuItem({
    type: 'normal',
    label: 'Close File',
    accelerator: 'CmdOrCtrl+W',
    enabled: false,
    click: () => {
        eventEmitter.emit('closeFile', {
            origin: 'mainmenu'
        });
    }
});

const editMenu = new MenuItem({
    label: 'Edit',
    submenu: [
        {
            role: 'undo',
            enabled: false
        },
        {
            role: 'redo',
            enabled: false
        },
        {
            type: 'separator',
            enabled: false
        },
        {
            role: 'cut',
            enabled: false
        },
        {
            role: 'copy',
            enabled: false
        },
        {
            role: 'paste',
            enabled: false
        },
        {
            role: 'selectall',
            enabled: false
        },
        {
            type: 'separator'
        },
        {
            type: 'normal',
            label: 'Find...',
            accelerator: 'CmdOrCtrl+F',
            enabled: false
        },
        {
            type: 'normal',
            label: 'Find and Replace...',
            accelerator: 'CmdOrCtrl+H',
            enabled: false
        },
    ]
});

const formatMenu = new MenuItem({
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
                {
                    type: 'checkbox',
                    label: 'ASCII'
                },
                {
                    type: 'checkbox',
                    label: 'UTF-8'
                },
                {
                    type: 'checkbox',
                    label: 'UTF-16'
                },
            ]
        },
        {
            type: 'submenu',
            label: 'Line Ending',
            submenu: [
                {
                    type: 'checkbox',
                    label: 'Windows'
                },
                {
                    type: 'checkbox',
                    label: 'Linux'
                },
                {
                    type: 'checkbox',
                    label: 'MacOS'
                },
            ]
        }
    ],
    enabled: false
});

const template = [
    {
        label: 'File',
        submenu: [
            {
                type: 'normal',
                label: 'New File',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    eventEmitter.emit('newFile', {
                        origin: 'mainmenu'
                    });
                }
            },
            {
                type: 'normal',
                label: 'Open File...',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    eventEmitter.emit('openFile', {
                        origin: 'mainmenu'
                    });
                }
            },
            saveF,
            saveAsF,
            revertF,
            closeF,
            {
                type: 'separator'
            },
            {
                type: 'normal',
                label: 'Close Editor',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    eventEmitter.emit('closeEditor', {
                        origin: 'mainmenu'
                    });
                }
            },
        ]
    },
    editMenu,
    /* formatMenu, */
    {
        label: 'Extras',
        submenu: [
            {
                type: 'submenu',
                label: 'Themes',
                submenu: [
                    { type: 'checkbox', label: 'Light' },
                    { type: 'checkbox', label: 'Dark' },
                    { type: 'checkbox', label: 'H4ck3r' },
                ]
            },
            {
                type: 'normal',
                label: 'About',
                click: () => {
                    eventEmitter.emit('showAbout', {
                        origin: 'mainmenu'
                    });
                }
            }
        ]
    },
    {
        label: '<Debug>',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                role: 'togglefullscreen'
            },
        ]
    },
];


function setFileDependentMenuItems(value){
    // Some menu items can't work properly without an open file, this function
    // allows the (de)activation of these items.
    const state = !!value;
    saveF.enabled = state;
    saveAsF.enabled = state;
    revertF.enabled = state;
    closeF.enabled = state;
    editMenu.visible = state;
}

module.exports = {
    'menuTemplate': template,
    'setFileState': setFileDependentMenuItems,
};