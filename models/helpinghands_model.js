var mong = require('mongoose').Mongoose;
var mongoose = new mong();
mongoose.connect('mongodb+srv://karimelghazouly:helpinghands@helpinghands-3b0tx.mongodb.net/HelpingHands?retryWrites=true', { useNewUrlParser: true });

var HelpingHandSchema = new mongoose.Schema({
    username: String,
    place: String,
    desc: String,
    category: String
});


var helpinghand = mongoose.model('helpinghand', HelpingHandSchema);
var userdata = require('../userdata');


module.exports.SaveHelpingHand = function(resp, newdata)
{
    newHelpingHand = helpinghand(newdata).save(function(err, data){        
        if(err)
            throw err;
        
        resp.redirect('/listhelpinghands');
    });
}

module.exports.GetHelpingHands = function(resp)
{
    helpinghand.find({}, function(err, data){
        if(err)
            throw err;

        resp.render('Pages/helpinghands_list',{helpinghands: data, userid:userdata.userid});
    });
}

