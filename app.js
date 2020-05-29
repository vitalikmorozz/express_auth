if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

// Load passport config
require('./config/passportConfig')(passport);

const PORT = process.env.PORT || 3000;

const app = express();

// Set template engine
app.set('view engine', 'ejs');

// Using express-flash to show messages
app.use(flash());

// Use express layout for easier template layout
app.use(expressLayout);

// To handle form inputs parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use express-session to store info about user locally in session
app.use(
	session({
		name: 'Session name',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, maxAge: 1000000, sameSite: true },
	})
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Always pass user to ejs
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Connect to MongoDB using Mongoose and MongoDB Atlas
mongoose.connect(
	process.env.MONGO_DB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.log(`MongoDB connection failed! Error: ${err}`);
		else console.log('MongoDB connected successfully');
	}
);

// Mongoose deprecation warning fixes
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Handle all additional routes
app.use('', require('./routes/auth'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, 'localhost', () => {
	console.log(`Server started on port: ${PORT}`);
});
