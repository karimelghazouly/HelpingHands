var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var usermodel = require('../models/user_model');
var userdata = require('../userdata');

module.exports = function(app)
{
    app.get('/register', urlparser, function(req, resp){
        resp.render('Pages/register',{userid: userdata.userid});
    });

    app.get('/login', urlparser, function(req, resp){
        resp.render('Pages/login',{userid: userdata.userid});
    });

    app.get('/logout', urlparser, function(req, resp){
        userdata.usercountry = "";
        userdata.username = "";
        userdata.userid = 0;
        resp.redirect('/home');
    });

    app.post('/login', urlparser, function(req, resp){
        data = req.body;
        usermodel.LoginUser(resp, data);
    });

    app.post('/register', urlparser, function(req, resp){
        data = req.body;
        usermodel.SaveUser(resp, req, data);
    });
}