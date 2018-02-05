"use strict";
const path = require("path");

module.exports = {
    "CACHE_SETTING":{
        "PATH": __dirname + '/Runtime/Cache',
        "APPEND_STR": "biaou_search"
    },
    "DB_TYPE": "mssql",
    "DB_SETTING":{
        user: 'sydzsw',
        password: 'kuku2011',
        server: '117.135.131.177',
        database: 'sydzsw'
    },
    "NATIVE_DB_SETTING": {
        DB_PATH: __dirname + '/biaou_search.sqlite'
    }
};