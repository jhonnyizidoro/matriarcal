const { literal, Op } = require('sequelize')
const Contact = require('../Models/Contact')

module.exports.renderContactPage = (req, res) => {
	res.render('site/contact')
}

module.exports.insertContact = async (req, res) => {
	await Contact.create({ ...req.body })
	setAlert('Contato recebido com sucesso.')
	res.redirect('/')
}

module.exports.renderContactsPage = async (req, res) => {
	const { content, isRead } = req.query
	const where = {}

	if (content) {
		where.content = { [Op.like]: `%${content}%` }
	}

	if (isRead) {
		where.isRead = isRead
	}

	const contacts = await Contact.findAll({ where })
	res.render('admin/contacts', { contacts })
}

module.exports.toggleContactRead = async (req, res) => {
	const { id } = req.params
	await Contact.update({ isRead: literal('NOT isRead') }, { where: { id } })
	setAlert('Contato alterado com sucesso.')
	res.redirect('back')
}