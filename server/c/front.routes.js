var express = require('express');
var router = express.Router();

var oIndexActions = require('../m/front.index.actions');

/*将请求静态化*/
router.get('/', oIndexActions.index);

module.exports = router;
