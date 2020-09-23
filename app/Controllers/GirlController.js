const { Op, literal } = require('sequelize')
const Girl = require('../Models/Girl')
const GirlImage = require('../Models/GirlImage')
const State = require('../Models/State')

module.exports.renderGirlsPage = async (req, res) => {
	const { displayName, isActive } = req.query
	const where = {}

	if (displayName) {
		where.displayName = { [Op.like]: `%${displayName}%` }
	}

	if (isActive) {
		where.isActive = isActive
	}

	const girls = await Girl.findAllWithCompleteData({ where })
	res.render('admin/girls', { girls })
}

module.exports.renderInsertGirlPage = async (req, res) => {
	const states = await State.findAll()
	const girl = { images: [] }
	res.render('admin/girlForm', { states, girl })
}

module.exports.insertGirl = async (req, res) => {
	const girl = await Girl.create({ ...req.body })
	if (req.body.image) {
		const sources = Array.isArray(req.body.image) ? req.body.image : [req.body.image]
		for (const source of sources) {
			const filename = source.split('/').pop()
			await GirlImage.create({ filename, girlId: girl.id })
		}
	}
	setAlert('Matriarca inserida com sucesso.')
	res.redirect('/admin/matriarcas')
}

module.exports.renderUpdateGirlPage = async (req, res) => {
	const { id } = req.params
	const girl = await Girl.findWithCompleteData({ where: { id } })
	const states = await State.findAll()
	res.render('admin/girlForm', { states, girl })
}

module.exports.updateGirl = async (req, res) => {
	const { id } = req.body

	await Girl.update({ ...req.body }, { where: { id } })
	await GirlImage.destroy({ where: { girlId: id } })

	if (req.body.image) {
		const sources = Array.isArray(req.body.image) ? req.body.image : [req.body.image]
		for (const source of sources) {
			const filename = source.split('/').pop()
			await GirlImage.create({ filename, girlId: id })
		}
	}

	setAlert('Matriarca atualizada com sucesso.')
	res.redirect('/admin/matriarcas')
}

module.exports.renderGirlPage = async (req, res) => {
	const { id } = req.params
	const girl = await Girl.findWithCompleteData({ where: { id, isActive: true } })
	if (girl) {
		res.render('site/girl', { girl })
	} else {
		res.redirect('/404')
	}
}

module.exports.toggleGirlStatus = async (req, res) => {
	const { id } = req.params
	await Girl.update({ isActive: literal('NOT isActive') }, { where: { id } })
	setAlert('Matriarca alterada com sucesso.')
	res.redirect('back')
}