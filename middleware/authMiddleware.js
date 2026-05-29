function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.redirect('/login');
  }
}

function isStaff(req, res, next) {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'staff')) {
    next();
  } else {
    res.redirect('/login');
  }
}

function isCustomer(req, res, next) {
  if (req.session.user && req.session.user.role === 'customer') {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = { isAuthenticated, isAdmin, isStaff, isCustomer };
