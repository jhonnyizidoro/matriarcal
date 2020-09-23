const { DataTypes, Model } = require('sequelize')
const connection = require('../../database')
const City = require('./City')

class State extends Model {
}

State.init({
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	abbreviation: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
}, {
	sequelize: connection,
	modelName: 'State',
	timestamps: false,
})

State.hasMany(City)

module.exports = State