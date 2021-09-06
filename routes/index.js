var router = require('express').Router();

router.use('/config', require('./api'));

module.exports = router;
