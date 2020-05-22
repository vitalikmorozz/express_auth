if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const app = express();

// Set template engine
app.set('view engine', 'ejs');

app.use(flash());
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		name: 'Session name',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, maxAge: 1000000, sameSite: true },
	})
);

// Handle all routes
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
	const message = req.session.username ? `Hello ${req.session.username} user!` : '';
	res.render('index', { message });
});

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
