module.exports = function setWrapper(ret, conf, settings, opt) {
    var files = [];
    var pkg = ret.map.pkg;
    for (key in pkg) {
        var file = ret.src[pkg[key]['uri']];
        var content = file._content
        content = 'define(function(require, exports, module){\n' + content + '\n});';
        file._content = content;
        files.push(file)
    }
    return files;
}