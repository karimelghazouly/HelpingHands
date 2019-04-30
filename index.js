let express = require('express');
let app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
let authConroller = require('./controllers/auth_controller');
let HelpingHandsController = require('./controllers/helping_hands_controller');
let HandsRequestsController = require('./controllers/hands_requests_controller');
var userdata = require('./userdata');
const PORT = process.env.PORT;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.get(['/','/home'],function(req,res){
    res.render('Pages/index', {userid : userdata.userid});
})

authConroller(app);
HelpingHandsController(app);
HandsRequestsController(app);

app.listen(PORT);