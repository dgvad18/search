/* 路由中间件 */
"use strict";

const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.append('Access-Control-Allow-Origin', '*');
    return res.send("hello");
});

router.use((err, req, res, next) => {
    if(!err) return next();
    return res.status(404).send("404 Not Found");
});

module.exports = router;