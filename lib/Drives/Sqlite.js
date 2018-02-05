"use strict";
/**
 * SQLite数据库驱动
 */

const sqlite = require("sqlite3").verbose(),
    config = require("../../Config");

class DBDrives
{
    constructor(conf)
    {
        if(conf){
            this.config = conf;
        }else{
            this.config = config.NATIVE_DB_SETTING;
        }
        this.connect();
    }

    connect()
    {
        this.db = new sqlite.Database(this.config.DB_PATH);
    }

    query(sqlStr){
        return new Promise(resolve => {
            try{
                this.db.serialize(() => {
                    this.lastSql = sqlStr;
                    this.db.each(sqlStr, (err, row) => {
                        if(err) resolve({err: err, data: false});
                        else resolve({err: false, data: row});
                    });
                });
            }catch(e){
                resolve({err: "sqlite DB query abnormal", data: false});
            }
        });
    }

    getLastSql()
    {
        return this.lastSql;
    }

    close()
    {
        this.db.close();
    }
}

module.exports = DBDrives;