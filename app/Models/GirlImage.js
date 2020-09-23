const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')

class GirlImage extends Model {
}

GirlImage.init({
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	girlId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize: connection,
	modelName: 'GirlImage',
	timestamps: false,
})

module.exports = GirlImage