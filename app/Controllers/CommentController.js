const { literal, Op } = require('sequelize')
const Comment = require('../Models/Comment')
const Girl = require('../Models/Girl')

module.exports.renderCommentPage = async (req, res) => {
	const girls = await Girl.findAllWithCompleteData()
	res.render('site/comment', { girls })
}

module.exports.insertComment = async (req, res) => {
	await Comment.create({ ...req.body })
	setAlert('Testemunho recebido com sucesso.')
	res.redirect('/')
}

module.exports.renderCommentsPage = async (req, res) => {
	const { content, isActive, isApproved } = req.query
	const where = {}

	if (content) {
		where.content = { [Op.like]: `%${content}%` }
	}

	if (isActive) {
		where.isActive = isActive
	}

	if (isApproved) {
		where.isApproved = isApproved
	}

	const comments = await Girl.getCommentsWithGirl({ where })
	res.render('admin/comments', { comments })
}

module.exports.toggleCommentStatus = async (req, res) => {
	const { id } = req.params
	await Comment.update({ isActive: literal('NOT isActive') }, { where: { id } })
	setAlert('Testemunho alterado com sucesso.')
	res.redirect('back')
}

module.exports.toggleCommentApproval = async (req, res) => {
	const { id } = req.params
	await Comment.update({ isApproved: literal('NOT isApproved') }, { where: { id } })
	setAlert('Testemunho alterado com sucesso.')
	res.redirect('back')
}