var express = require('express');
var fs = require("fs")
// var history =  require('connect-history-api-fallback');
/**
 * 请将所有属于本系统的路由等信息放置在该函数中。
 */


module.exports = function (app) {
    app.use('/', require('../server/c/front.routes.js'));
};