var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var usermodel = require('../models/user_model');
var userdata = require('../userdata');

module.exports = function(app)
{
    app.get('/helpinghands/requests', urlparser, function(req, resp){
        resp.render('Pages/hands_requests_intro',{userid: userdata.userid});
    });

    app.get('/listhelpinghands', urlparser, function(req, resp){
        resp.render('hands_requests_list',{userid: userdata.userid});
    });

    
}