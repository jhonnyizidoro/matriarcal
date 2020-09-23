const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')

class Comment extends Model {
}

Comment.init({
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	isApproved: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	girlId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize: connection,
	modelName: 'Comment',
})

module.exports = Comment