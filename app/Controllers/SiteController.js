const { SitemapStream, streamToPromise } = require('sitemap')
const { Op } = require('sequelize')
const Girl = require('../Models/Girl')
const State = require('../Models/State')
const City = require('../Models/City')

module.exports.renderHomePage = async (req, res) => {
	const {
		search,
		minAge,
		maxAge,
		halfAnHourValue,
		cityId,
		creditCard,
		ownPlace,
	} = req.query

	const where = { isActive: true }

	if (search) {
		where[Op.or] = {
			displayName: { [Op.like]: `%${search}%` },
			details: { [Op.like]: `%${search}%` },
			title: { [Op.like]: `%${search}%` },
		}
	}

	if (minAge && maxAge) {
		where.age = { [Op.between]: [minAge, maxAge] }
	} else {
		if (minAge) {
			where.age = { [Op.gte]: minAge }
		} else if (maxAge) {
			where.age = { [Op.lte]: maxAge }
		}
	}

	if (halfAnHourValue) {
		where.halfAnHourValue = { [Op.lte]: halfAnHourValue }
	}

	let activeCity
	if (cityId) {
		activeCity = await City.findByPk(cityId)
		where.cityId = cityId
	}

	if (creditCard) {
		where.payment = { [Op.like]: `%cartão%` }
	}

	if (ownPlace) {
		where.place = { [Op.like]: `%próprio%` }
	}

	const states = await State.findAll()
	const girls = await Girl.findAllWithCompleteData({ where })

	const values = {
		min: await Girl.min('halfAnHourValue', { where: { isActive: true } }),
		max: await Girl.max('halfAnHourValue', { where: { isActive: true } }),
	}
	const ages = {
		min: await Girl.min('age', { where: { isActive: true } }),
		max: await Girl.max('age', { where: { isActive: true } }),
	}

	res.render('site/home', { girls, values, ages, states, activeCity })
}

module.exports.render404Page = (req, res) => {
	res.status(404).render('site/404')
}

module.exports.render500Page = (err, req, res, next) => {
	res.status(500).render('site/500', { err })
}

module.exports.sendSitemap = async (req, res) => {
	const girls = await Girl.findAllWithCompleteData({ where: { isActive: true } })
	const links = [
		{ url: '/', changefreq: 'daily', priority: 1 },
		{ url: '/contato', changefreq: 'weekly', priority: .5 },
		{ url: '/testemunhe', changefreq: 'weekly', priority: .5 },
	]
	girls.forEach(girl => {
		links.push({ url: getOptimizedUrl(girl), changefreq: 'daily', priority: 1 })
	})
	const cities = {}
	girls.forEach(girl => cities[girl.cityId] = true)
	for (const id in cities) {
		const city = await City.findByPk(id)
		const state = await State.findByPk(city.stateId)
		links.push({ url: `/acompanhantes-${city.name}/?cityId=${id}&state=${state.id}`, changefreq: 'daily', priority: 1 })
	}
	const stream = new SitemapStream({ hostname: host })
	links.forEach(link => stream.write(link))
	stream.end()
	const sitemap = await streamToPromise(stream)
	const xml = sitemap.toString()
	res.header('Content-Type', 'application/xml')
	res.send(xml)
}