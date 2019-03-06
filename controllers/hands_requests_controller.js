var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var usermodel = require('../models/user_model');
var userdata = require('../userdata');

module.exports = function(app)
{
    app.get('/helpinghands', urlparser, function(req, resp){
        resp.render('Pages/helping_hands_intro',{userid: userdata.userid});
    });

    app.get('/listhelpinghands', urlparser, function(req, resp){
        resp.render('helping_hands_list',{userid: userdata.userid});
    });

    
}