const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')
const GirlImage = require('./GirlImage')
const Comment = require('./Comment')
const City = require('./City')

class Girl extends Model {
}

Girl.init({
	displayName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	weight: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	height: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	neighborhood: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	instagram: {
		type: DataTypes.STRING,
	},
	facebook: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	whatsApp: {
		type: DataTypes.STRING,
	},
	phone: {
		type: DataTypes.STRING,
	},
	publicType: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	halfAnHourValue: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	hourValue: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	payment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	place: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	details: {
		type: DataTypes.TEXT,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	cityId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize: connection,
	modelName: 'Girl',
})

Girl.findWithCompleteData = async options => {
	const girl = await Girl.findOne(options || {})
	if (girl) {
		const otherProps = await findGirlData(girl)
		return { ...girl, ...otherProps }
	}
	return null
}

Girl.findAllWithCompleteData = async (options = {}) => {
	const girls = await Girl.findAll(options)
	const girlsWithData = []
	for (const girl of girls) {
		const otherProps = await findGirlData(girl)
		girlsWithData.push({ ...girl, ...otherProps })
	}
	return girlsWithData
}

const findGirlData = async ({ id, cityId }) => {
	const [images, comments, city] = await Promise.all([
		GirlImage.findAll({ where: { girlId: id } }),
		Comment.findAll({ where: { girlId: id, isActive: true, isApproved: true } }),
		City.findByPk(cityId),
	])
	return {
		comments,
		city: city.name,
		stateId: city.stateId,
		images: images.map(({ filename }) => filename),
	}
}

Girl.getCommentsWithGirl = async options => {
	const comments = await Comment.findAll(options || {})
	const commentsWithData = []
	for (const comment of comments) {
		const statusLabel = comment.isActive ? (comment.isApproved ? 'Ativo' : 'Aguardando aprovação') : 'Excluído'
		const girl = await Girl.findByPk(comment.girlId)
		commentsWithData.push({ ...comment, girl, statusLabel })
	}
	return commentsWithData
}

module.exports = Girl