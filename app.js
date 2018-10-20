/*设置应用根目录*/
process.env.NODE_lano_ROOT = __dirname;

/* 获取应用运行模式 */
var runPattern = process.env.NODE_ENV;
if (runPattern !== 'production') {
    runPattern = 'development';
}

console.log('\b进程[', process.pid, ']运行环境为: ', runPattern);

/* 加载应用所需的模块 */
var sConfFile = '/lano-config.js';
var express = require('express');
var path = require('path');
/* 应用服务器实例 */
var app = express();

/* 模板引擎配置 */
app.set('views', path.join(__dirname, '/web/html'));
/* 开发环境下的静态文件服务配置 */
if (runPattern == 'development') {
    app.set('view cache', false);
} else {
    app.set('view cache', true);
}
app.set('view engine', 'tpl');



/* 解析请求体的中间件，必须开启 */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/* 开发环境下的静态文件服务配置 */
app.use('/static', express.static(path.join(__dirname, '/web/static')));
app.use('/web', express.static(path.join(__dirname, '/web')));


/* 开发和生产环境下都存在的静态文件服务器配置 */
app.use(express.static(path.join(__dirname, 'web/html')));
app.use(express.static(path.join(__dirname, 'web/html')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));



require('./conf/app-local.js')(app, runPattern);

// 处理404
app.use(function (req, res, next) {
    if (req.url) {
        console.log('Cannot find:' + req.url);
    }
    res.status(404).end();
});


// 错误处理
app.use(function (err, req, res, next) {
    err = err || {};
    err.status = err.status || 500;
    res.status(err.status);
    res.redirect('/');
    return;
});

// 未捕获的异常处理
app.use(function (err, req, res, next) {
    res.send('服务器发生未知错误，请与管理员联系。');
});


/* 处理进程未捕获的异常 */
process.on('uncaughtException', function (err) {
   console.error('未捕获的进程异常|uncaughtException|', err);
});

module.exports = app;
