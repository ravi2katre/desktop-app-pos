const electron = require('electron');
const servers_services = require("./sqlite3.js");

var ipcMain = electron.ipcMain;

ipcMain.on('DbService',function(event, arg){

    var extra_methods =  {
        "get_products": function(args){
            console.log(" \n call function get_products");
            //var result = servers_services.db.get("SELECT * FROM sma_groups");
            console.log("**********servers_services*************");
            var sql = "SELECT * FROM sma_products";
            servers_services.db.get(sql).then(function(response){
                console.log(response);
                event.returnValue =response;

            });
        },
        "get_users": function(args){
            var where = '';
            where +=(args.id > 0)? 'id='+args.id:'';

            console.log(" \n call function get_users");
            //var result = servers_services.db.get("SELECT * FROM sma_groups");
            console.log("**********servers_services*************");
            var sql = "SELECT * FROM sma_users";
            servers_services.db.get(sql).then(function(response){
                console.log(response);
                event.returnValue =response;

            });
        },
        "get_categories": function(args){
            console.log(" \n call function get_categories");
            //var result = servers_services.db.get("SELECT * FROM sma_groups");
            console.log("**********servers_services*************");
            var sql = "SELECT * FROM sma_categories";
            servers_services.db.get(sql).then(function(response){
                console.log(response);
                event.returnValue =response;

            });
        }

    };


    console.log("**********arg from client*************");
    console.log(arg);


            //copy.push(item)
            if (typeof extra_methods[arg[0].action] === "function") {
                // safe to use the function
                extra_methods[arg[0].action](arg[0]);
            }else{
                console.log(" \n Function not found "+arg[0].action);
            }



});
/*ipcMain.on('ping',function(event, arg){
    console.log("ping this function");
    //event.sender.send = "pong";
    event.returnValue = "return text";
    win.webContents.send('pong', 5);
});*/

/*ipcMain.on('menu',function(event, arg){
    console.log("ping this function");
    //event.sender.send = "pong";
    event.returnValue = "return text";
    //win.webContents.send('pong', 5);
});*/