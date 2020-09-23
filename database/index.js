const { Sequelize } = require('sequelize')

const DB_NAME = process.env.DB_NAME || 'matriarcal'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASS || 'root'
const DB_HOST = process.env.DB_HOST || 'localhost'

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	dialect: 'mysql',
	host: DB_HOST,
	collate: 'utf8mb4_unicode_ci',
	query: {
		raw: true,
	},
})