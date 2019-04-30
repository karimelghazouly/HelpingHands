var bodyParser = require('body-parser');
var urlparser = bodyParser.urlencoded({extended : false});
var helpinghands_model = require('../models/helpinghands_model');
var userdata = require('../userdata');

module.exports = function(app)
{
    app.get('/helpinghands', urlparser, function(req, resp){        
        resp.render('Pages/hands_requests_intro',{userid: userdata.userid});
    });
    
    app.get('/listhelpinghands', urlparser, function(req, resp){
        helpinghands_model.helpinghand.find({request:false}, function(err, data){
            if(err)
                throw err;

            resp.render('Pages/helpinghands_list',{helpinghands: data, userid:userdata.userid});
        });
    });
    
    app.get('/helpinghands/new', urlparser, function(req, resp){
        resp.render('Pages/new_helpinghand',{userid: userdata.userid, usercountry: userdata.usercountry});
    });

    app.get('/tran/:id/:dd/*',function(req, resp){
    });


    app.post('/helpinghands/new', urlparser, function(req, resp){
        
        data = req.body;
        data.username = userdata.username;
        
        if(data.place == "onsite")
            data.place = userdata.usercountry;

        helpinghands_model.SaveHelpingHand(resp, data);
    });
    
}