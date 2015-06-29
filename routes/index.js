var express = require('express');
var router = express.Router();


router.get('/items', function(req, res, next) {
   res.json([
       "Where are you?",
       "Something wrong.",
       "Have lunch."
   ]);
});

module.exports = router;
