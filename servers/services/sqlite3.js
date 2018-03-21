/*******************************Database code**********************************************/
var mydb = {
    "sqlite3":null,
    "db":null,
    conn: function(){
        //const sqlite3 = require('sqlite3').verbose();
        //const db = new sqlite3.Database('./database.sqlite3');
        //this.db = new sqlite3.Database('./simadmin_offline_ci3.db');

        var sqlite3 = require('sqlite3').verbose();
        const dbPath = path.resolve(__dirname, 'simadmin_offline_ci3.db');

        console.log(dbPath);
        this.db = new sqlite3.Database(dbPath);


    },
    conn_close:function(){
        this.db.close();
    },

    query:function(sql){

        this.conn();
        var _self = this;
        return new Promise(function(resolve,reject){
            _self.db.serialize(function() {
                _self.db.all(sql, function(err, rows) {
                    //console.log(row.id + ": " + row.name);
                    if(!err){
                        resolve(rows);
                    }else{
                        reject(err);
                    }

                });

            });
        });

        _self.conn_close();
    }

};
/*******************************database code end**********************************************/