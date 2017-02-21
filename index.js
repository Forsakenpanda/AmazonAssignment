/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 * January 30th, 2017
 */
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport');
var flash = require('connect-flash');
var cookie = require('cookie-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/'));


app.use(cookie());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie:{maxAge:60000}
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Setup SQL
var connection = mysql.createPool({
	host: 'assignment2db.cmt1xgv0cnbd.us-west-2.rds.amazonaws.com',
	user: 'Forsakenpanda771',
	password: 'Crashnburn771',
	database:'Assignment2Database'
});


passport.use('login-local', new LocalStrategy({
	usernameField:'user',
	passwordField:'pass',
	passReqToCallback:true
}, function(req, username, password, done){
	connection.query("SELECT * FROM Users Where username='" + username + "'", function(err, rows){
		if(err) {
			return done(err);
		}
		if (!rows.length){
			return done(null, false, {message:"Invalid username"});
		}
		if(!(rows[0].password == password)) {
			return done(null, false, {message:"Incorrect password"});
		}
		return done(null, rows[0]);
	});
}));

passport.use('register-local', new LocalStrategy({
	passReqToCallback:true
}, function(req, username, password, done){
	connection.query("SELECT * FROM Users WHERE username='" + username +"'", function(err, rows){
		console.log(rows);
		if (err){
			return done(err);
		} 
		if(rows.length) {
			return done(null, false, {message:"Name already taken"});
		} else {
			connection.query("INSERT INTO Users (username, password, credits) values ('" + username+"','"+password+"','" + req.body.credits + "') ", function(err, rows){
				return done(null, {message:"Succesfully registered!"});
			});
		}
	})
}))

/*****************************************************************
 * ROUTES
 ******************************************************************/
//Registration page
app.post('/register', function(req, res, next){
	passport.authenticate('register-local', function(err, user, data){
		if(!user){
			res.json(data);
		} else {
			res.json(user);
		}
	})(req, res, next);
}, function(){});

//Updates the amount of credits to a user
app.post('/updateCredits', function(req, res){
	console.log(req.body);
	connection.query("UPDATE Users SET credits=" + req.body.credits + " WHERE userID=" + req.body.id);
})


//Login page

app.post('/login',function(req, res, next){
	passport.authenticate('login-local', function(err, user, data){
		console.log(data);
		if (!user){
			res.json(data);
			//res.status(500).send("Error logging in");
		} else {
			res.json(user);
			connection.query("UPDATE Users SET isSignedIn=1 WHERE username='" + req.body.user+ "' AND password='" + req.body.pass +"'");
			setTimeout(function(){autoLogOut(req.body.user, req.body.pass)}, 300000);//5 minutes
		}
	})(req, res, next);

}, function(){});



//Return the count of currently active users.
app.get('/getCount', function(req, res){
	var stringQuery = "SELECT COUNT(*) FROM Users WHERE isSignedIn='1'";
	connection.query(stringQuery, function(err, data){
		if(err){
			console.error(err);
			res.status(500).send("Could not obtain count");
		} else {
			console.log(data[0]['COUNT(*)']);
			res.json(data[0]['COUNT(*)']);
		}
	})
})

//Returns the products in the database
app.get('/getProducts', function(req,res){
	connection.query("SELECT * FROM Products", function(err, data){
		if(err){
			console.error(err);
			res.status(500).send("Could not read products");
		} else {
			console.log(data);
			res.json(data);
		}
	})
})


//Automatically log out a user
function autoLogOut(username, password){
	console.log("Logging out");
	var stringQuery = "UPDATE Users SET isSignedIn=0 WHERE username='" + username + "' AND password='" + password +"'";
	connection.query(stringQuery, function(err, data){
		if (err){
			console.error(err);
		}
	}) 
}


//Home page
app.get('/', function(req,res){
	res.render('index');
});



app.listen(app.get('port'));