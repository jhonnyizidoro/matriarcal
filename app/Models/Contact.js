const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')

class Contact extends Model {
}

Contact.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	contact: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.MEDIUMINT,
		allowNull: false,
	},
	isRead: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
}, {
	sequelize: connection,
	modelName: 'Contact',
})

module.exports = Contact