"use strict";
/**
 * 数据库中间层
 * @author <syoryken@sina.com> @date 2018-01-31
 */

const config = require("../Config");

let DBDrivesCls, fileName;

switch (config.DB_TYPE.toLowerCase()){
    case 'mssql':
        fileName = "./Drives/MsSql";
        break;
    case "mysql":
        fileName = "./Drives/MySql";
        break;
    default:
        fileName = "./Drives/MsSql";
}

try{
    DBDrivesCls = require(fileName);
}catch(e){
    throw new Error("db drives require error");
}

class DB extends DBDrivesCls
{
    constructor(){
        super();
    }
}

module.exports = DB;