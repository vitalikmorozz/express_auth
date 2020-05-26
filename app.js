if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');

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

// Always pass user to ejs
app.use((req, res, next) => {
	res.locals.user = req.session.user;
	next();
});

// Handle all additional routes
app.use('', require('./routes/auth'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
