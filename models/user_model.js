var bcrypt = require('bcrypt');
var mong = require('mongoose').Mongoose;
var mongoose = new mong();
mongoose.connect('mongodb+srv://karimelghazouly:helpinghands@helpinghands-3b0tx.mongodb.net/Authenticaiton?retryWrites=true', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    country: String
});


var user = mongoose.model('user', userSchema);
var userdata = require('../userdata');


module.exports.SaveUser = function(resp, newdata)
{
    if(newdata.password != newdata.confirmpassword)
    {
        resp.render("Pages/register", {message: "Passwords does not match"});
        return;
    }
    
    CheckUsername(resp, newdata);
    
}


CheckUsername = function(resp, newdata)
{
    user.findOne({username: newdata.username}, function(err, data){
        if(err)
            throw err;

        if(data == null)
        {
            CheckEmail(resp,newdata);
            return;
        }
        
        else
            resp.render("Pages/register",{message: "Username already exists"});

    });
}


CheckEmail = function(resp, newdata)
{
    user.findOne({email: newdata.email}, function(err, data){
        if(err)
            throw err;

        if(data == null)
        {
            SaverUserDB(resp, newdata);
            return;
        }
        
        else
            resp.render("Pages/register",{message: "Email already exists"});

    });
}


SaverUserDB = function(resp, newdata)
{
    bcrypt.hash(newdata.password, 10, function(err,hash){
        
        newdata.password = hash;
        newItem = user(newdata).save(function(err, data){
            if(err)
                throw err;
            
            userdata.username = newdata.username;
            userdata.userpassword = newdata.password;
            userdata.userid = data._id;
            userdata.usercountry = data.country;
            resp.redirect('/home');
        });
    })
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
