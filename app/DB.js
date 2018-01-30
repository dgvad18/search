"use strict";
/* 数据库中间层 */

const mssql = require("mssql");
const config = require("../Config");

class DB
{
    constructor(){
        this.errMsg = "";
        this.config = config.DB_SETTING;
        this.request = null;
        this.dbLink = this.connect();
    }

    connect(){
        this.dbLink = new mssql.ConnectionPool(this.config, err => {
            if(err) this.throwErr(err);
            else{
                return new Request(this.dbLink);
                /*this.request = new mssql.Request(this.dbLink);
                console.log(this.request);*/
            }
        });
        this.dbLink.on('error', () => {
            this.throwErr('数据库连接错误');
        });
    }

    query(sql){
        // console.log(this.dbLink);
        /*this.request.execute(sql, (err, record, result, affected) => {
            if(err) console.log(err);
        });*/
    }

    getLastSql(){

    }

    getErrMsg(){
        return this.errMsg;
    }

    throwErr(msg){
        throw new Error(msg);
    }
}



let db = new DB();
db.query("show databases");

module.exports = DB;