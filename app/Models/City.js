const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')

class City extends Model {
}

City.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	stateId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
}, {
	sequelize: connection,
	modelName: 'City',
	timestamps: false,
})

module.exports = City