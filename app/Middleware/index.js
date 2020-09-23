const { svg, formattedDate, getOptimizedUrl, param, setAlert, seo } = require('../../util')

module.exports.globalVariables = (req, res, next) => {
	global.host = `${req.protocol}://${req.get('host')}`
	global.url = `${global.host}${req.originalUrl || req.url}`
	global.pathname = req.path
	global.svg = svg
	global.formattedDate = formattedDate
	global.getOptimizedUrl = getOptimizedUrl
	global.param = param
	global.setAlert = setAlert
	global.seo = seo
	next()
}

module.exports.checkAuth = (req, res, next) => {
	if (req.session.isAuthenticated || process.env.NODE_ENV !== 'production') {
		next()
	} else {
		res.redirect('/admin/login')
	}
}

module.exports.forceHttps = (req, res, next) => {
	if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
		res.redirect('https://' + req.get('host') + req.url)
	} else {
		next()
	}
}
