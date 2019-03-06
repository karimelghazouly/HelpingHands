let express = require('express');
let app = express();
let authConroller = require('./controllers/auth_controller');
let HelpingHandsController = require('./controllers/helping_hands_controller');
let HandsRequestsController = require('./controllers/hands_requests_controller');
var userdata = require('./userdata');
const PORT = 5000;


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get(['/','/home'],function(req,res){
    res.render('Pages/index', {userid : userdata.userid});
})

authConroller(app);
HelpingHandsController(app);
HandsRequestsController(app);

app.listen(PORT);