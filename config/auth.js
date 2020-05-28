// Check if user is logged in, if not redirect to /login page
function authorizedUser(req, res, next) {
	if (req.user === undefined || req.session.user === null) {
		req.flash('error', 'You need to be authenticated to view this page');
		res.redirect('/login');
	} else next();
}

function unauthorizedUser(req, res, next) {
	if (req.user !== undefined && req.session.user !== null) {
		req.flash('error', 'You can not do this');
		res.redirect('/');
	} else next();
}

function hasRole(role) {
	return function (req, res, next) {
		if (req.user.roles.includes(role)) next();
		else {
			req.flash('error', 'You do not have permission to do this');
			res.status(403).redirect('/');
		}
	};
}

module.exports = {
	authorizedUser,
	unauthorizedUser,
	hasRole,
};
