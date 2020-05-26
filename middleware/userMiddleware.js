// Check if user is logged in, if not redirect to /login page
function authorizeUser(req, res, next) {
	if (req.session.user === undefined || req.session.user === null) {
		req.flash('error', 'You need to be authenticated to view this page');
		res.redirect('/login');
	} else {
		next();
	}
}

module.exports = {
	authorizeUser,
};
