var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var usermodel = require('../models/user_model');
var userdata = require('../userdata');
var helpinghands_model = require('../models/helpinghands_model')

module.exports = function(app)
{
    app.get('/helpinghands/requests', urlparser, function(req, resp){
        resp.render('Pages/helping_hands_intro',{userid: userdata.userid});
    });

    app.get('/listrequests', urlparser, function(req, resp){
        helpinghands_model.helpinghand.find({request:true}, function(err, data){
            if(err)
                throw err;
    
            resp.render('Pages/hands_requests_list',{helpingHandsRequests: data, userid:userdata.userid});
        });
    });


    app.get('/helpinghands/requests/new', urlparser, function(req, resp){
        resp.render('Pages/new_helpinghand',{userid: userdata.userid, usercountry: userdata.usercountry, request:true});
    });


    app.post('/helpinghands/requests/new', urlparser, function(req, resp){
        
        data = req.body;
        data.username = userdata.username;
        
        if(data.place == "onsite")
            data.place = userdata.usercountry;

        data.request = true;
        helpinghands_model.SaveHelpingHand(resp, data);
    });


}