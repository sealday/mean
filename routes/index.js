var express = require('express');
var router = express.Router();

var items=[
    "Where are you?",
    "I am here.",
    "Something wrong."
    ];


router.get('/items', function(req, res, next) {
   res.json(items);
});

router.post('/items',function(req,res,next){
    items.push(req.body.item);
    res.json({msg:'success'});
});


module.exports = router;
