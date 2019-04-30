const bcrypt = require('bcrypt');
var mong = require('mongoose').Mongoose;
var mongoose = new mong();
mongoose.connect('mongodb+srv://karimelghazouly:helpinghands@helpinghands-3b0tx.mongodb.net/HelpingHands?retryWrites=true', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    country: String
});


var user = mongoose.model('user', userSchema);
var userdata = require('../userdata');


module.exports.SaveUser = async function(resp, req, newdata)
{
    if(newdata.password != newdata.confirmpassword)
    {
        resp.render("Pages/register", {message: "Passwords does not match"});
        return;
    }

    return await CheckUsername(resp, req, newdata);
}


CheckUsername = async function(resp, req, newdata)
{
    let found = await user.findOne({username: newdata.username});
    
    if(found == null)
        return await CheckEmail(resp, req, newdata);
    
    else
        resp.render("Pages/register",{message: "Username already exists"});

}


CheckEmail = async function(resp, req, newdata)
{
    let found = await user.findOne({email: newdata.email});
    
    if(found == null)
        return await SaverUserDB(resp, req, newdata);
        
    else
        resp.render("Pages/register",{message: "Email already exists"});

}


SaverUserDB = async function(resp, req, newdata)
{
    newdata.password = bcrypt.hashSync(newdata.password, 10);
    newItem = await user(newdata).save();
    userdata.username = data.username;
    userdata.userpassword = data.password;
    userdata.userid = data._id;
    userdata.usercountry = data.country;
    req.session.cookie.user = newItem;
    resp.redirect('/home');
}

module.exports.LoginUser = function(resp, udata)
{

    user.findOne({username: udata.username}, function(err, data){
        if(err)
            throw err;

        if(data == {} || data == null)
        {
            resp.render("Pages/login",{message: "Invalid username"});
            return;
        }
        
        bcrypt.compare(udata.password, data.password, function(err, state){
            if(!state)
                resp.render("Pages/login",{message: "Invalid password"});
            else
            {
                userdata.username = data.username;
                userdata.userpassword = data.password;
                userdata.userid = data._id;
                userdata.usercountry = data.country;
                resp.redirect("/home");
            }
        });
    });

}
