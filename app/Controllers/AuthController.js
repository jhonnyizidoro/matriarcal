module.exports.renderLoginPage = (req, res) => {
	res.render('admin/login')
}

module.exports.login = (req, res) => {
	const { username, password } = req.body
	if (
		(username === 'matriarcal' && password === '@admin') ||
		(username === 'jhonny' && password === '@admin')
	) {
		req.session.isAuthenticated = true
		res.redirect('/admin/matriarcas')
	} else {
		setAlert('As credenciais informadas não correspondem com nossos registros.')
		res.redirect('/admin/login')
	}
}

module.exports.logout = (req, res) => {
	req.session.destroy()
	res.redirect('/admin/login')
}