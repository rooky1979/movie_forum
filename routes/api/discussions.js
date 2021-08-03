const express = require('express');
const router = express.Router();

//@route    GET api/discussions
//@desc     Test route
//@access   Public

router.get('/', (req, res) => res.send('Test discussion route'));

module.exports = router;
