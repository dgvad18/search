"use strict";
/**
 * MSSQL数据库驱动
 * @author <syoryken@sina.com> @date 2018-01-31
 */

const sql = require("mssql");
const config = require("../../Config");

class DBDrives
{
    constructor()
    {
        this.config = config.DB_SETTING;
    }

    connect()
    {
        return new Promise(resolve => {
            this.dbLink = new sql.ConnectionPool(this.config, (err) => {
                if(err) throw new Error(err);
                else resolve();
            });
        });
    }

    query(sqlStr)
    {
        return new Promise(resolve => {
            this.connect().then(() => {
                this.request = new sql.Request(this.dbLink);
                this.lastSql = sqlStr;
                this.request.query(sqlStr, (err, data) => {
                    if(err) resolve({err: err, data: false});
                    else resolve({err: false, data: data});
                });
            });
        });
    }

    close()
    {
        this.dbLink.close();
    }

    getLastSql()
    {
        return this.lastSql;
    }
}

module.exports = DBDrives;