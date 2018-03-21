const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = electron;
const knex = require('knex')({
    client:"sqlite3",
    connection:{
      filename: path.resolve(__dirname, 'simadmin_offline_ci3.db')
    },
    useNullAsDefault: false
  });


let win;
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({

        width: 600,
        height: 600,
        fullscreen:false,
        backgroundColor: '#ffffff',
        webPreferences: {
            /*nodeIntegration: false,
            webviewTag: false,
            sandbox: false,
            allowRunningInsecureContent: true,
            offscreen: false,*/
            webSecurity: false
            //contextIsolation: true
        }
    });

    //win.setMenu(null)

    var index_html_path = path.resolve(__dirname, 'dist/index.html');
    win.loadURL('file://' + index_html_path);
    //win.loadURL('http://localhost:4200');

    //// uncomment below to open the DevTools.
    //win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    });
    /*******************************IPC START**********************************************/

    var ipcMain = electron.ipcMain;
    
    ipcMain.on('DbService',function(event, arg){
        
        console.log("------------------servers_services---------------------");
        // event.returnValue = get_users();
        console.log(arg[0]);
        switch(arg[0].action){
            case 'select_row':           
            let select_row = knex(arg[0].table).where(arg[0].where_fields).select("*");            
            select_row.then(function(res){
                //console.log(res);
                event.returnValue =res;
            });
            break;

            case 'select_rows':           
            let select = knex(arg[0].table).select();            
            select.then(function(res){
                //console.log(res);
                event.returnValue =res;
            });
            break;

            case 'delete_row':
            let result = knex(arg[0].table).where(arg[0].where_fields).del();            
            result.then(function(res){
                //console.log(res);
                event.returnValue =res;
            });
            break;

            case 'update_row':

            var update = knex(arg[0].table).where(arg[0].where_fields).update(arg[0].fields);
            update.then(function(res){
                //console.log(res);
                event.returnValue =res;
            });

            break;

            case 'insert_row':
            var insert = knex(arg[0].table).insert(arg[0].fields);
            insert.then(function(res){
                //console.log(res);
                event.returnValue =res;
            });
            break;

            default:
            event.returnValue = [{"opopps":"opopps"}]; 
        }//switch end
    });//ipc dbservice end

    

}

// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
});



