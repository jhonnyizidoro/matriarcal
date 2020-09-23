const City = require('../Models/City')

module.exports.getCitiesByState = async (req, res, next) => {
	const { id } = req.params
	const cities = await City.findAll({
		where: {
			stateId: id,
		},
	})
	res.json(cities)
}