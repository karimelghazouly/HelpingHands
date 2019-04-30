var mong = require('mongoose').Mongoose;
var mongoose = new mong();
mongoose.connect('mongodb+srv://karimelghazouly:helpinghands@helpinghands-3b0tx.mongodb.net/HelpingHands?retryWrites=true', { useNewUrlParser: true });

var HelpingHandSchema = new mongoose.Schema({
    username: String,
    place: String,
    desc: String,
    category: String,
    request: {
        type: Boolean,
        default: false
    }
});


module.exports.helpinghand = mongoose.model('helpinghand', HelpingHandSchema);
helpinghand = mongoose.model('helpinghand', HelpingHandSchema);
var userdata = require('../userdata');


module.exports.SaveHelpingHand = function(resp, newdata)
{
    newHelpingHand = helpinghand(newdata).save(function(err, data){        
        if(err)
            throw err;
        
        if(newdata.request == null)
            resp.redirect('/listhelpinghands');
        else
            resp.redirect('/listrequests');
    });
}

