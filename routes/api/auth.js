const express = require('express');
const router = express.Router();

//@route    GET api/auth
//@desc     Test auth route
//@access   Public

router.get('/', (req, res) => res.send('Test Auth route'));

module.exports = router;
