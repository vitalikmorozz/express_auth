const express = require('express');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;

const app = express();

// Set template engine
app.set('view engine', 'ejs');

app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle all user routes
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
