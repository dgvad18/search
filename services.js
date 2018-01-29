/* 搜索程序后台脚本 */
"use strict";

const express = require("express");
const app = express();
const Router = require("./application/Router");

app.use(Router);

app.listen(8888);
