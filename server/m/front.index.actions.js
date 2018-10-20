var fs = require("fs");


/**
 * 主界面请求
 * @param req
 * @param res
 * @param next
 */
function index(req, res) {
   res.sendFile('../../web/html/index.html');
}

module.exports = {
    index: index,
};