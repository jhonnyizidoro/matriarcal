const { readFileSync } = require('fs')
const { join } = require('path')
const slugify = require('slugify')

module.exports.setAlert = alertMessage => global.alertMessage = alertMessage
module.exports.svg = (path, className) => readFileSync(join(__dirname, '../', 'resources', 'svg', `${path}.svg`), 'UTF-8').replace('className', className)
module.exports.getOptimizedUrl = girl => `/acompanhante/${slugify(`${girl.city}-${girl.neighborhood}`)}/${slugify(`${girl.displayName}-${girl.id}`)}`
module.exports.param = key => new URL(url).searchParams.get(key)
module.exports.formattedDate = date => {
	const day = `0${date.getDate()}`.slice(-2)
	const month = `0${date.getMonth() + 1}`.slice(-2)
	const year = date.getFullYear()
	const hour = `0${date.getHours()}`.slice(-2)
	const minutes = `0${date.getMinutes()}`.slice(-2)
	return `${day}/${month}/${year} - ${hour}:${minutes}`
}
module.exports.seo = (girl, activeCity) => {

	const adminDefaults = pageName => ({
		title: `Painel Matriarcal | ${pageName}`,
		description: 'Acesse o painel de administração do Matriarcal para gerenciar os contatos e as garotas cadastradas.',
		keywords: 'painel de administração, matriarcal, gerencie as deusas gregas',
	})

	const siteDefaults = pageName => ({
		title: `Matriarcal | ${pageName}`,
		description: 'Visite a Matriarcal Acompanhantes. As Melhores acompanhantes em sua cidade. Encontre a acompanhante perfeita para você, fotos originais e meninas lindas.',
		keywords: 'matriarcal, acompanhantes, acompanhantes curitiba, sexo, garotas de programa, acompanhastes, meninas lindas, garotas, 24 horas, madrugada',
	})

	if (pathname.includes('admin/login')) {
		return adminDefaults('Login')
	} else if (pathname.includes('admin/matriarcas/editar')) {
		return adminDefaults('Editar Matriarca')
	} else if (pathname.includes('admin/matriarcas/inserir')) {
		return adminDefaults('Inserir Matriarca')
	} else if (pathname.includes('admin/matriarcas')) {
		return adminDefaults('Matriarcas')
	} else if (pathname.includes('admin/contatos')) {
		return adminDefaults('Contatos')
	} else if (pathname.includes('admin/testemunhos')) {
		return adminDefaults('Testemunhos')
	} else if (pathname.includes('contato')) {
		return siteDefaults('Contato')
	} else if (pathname.includes('testemunhe')) {
		return siteDefaults('Testemunhe')
	} else if (pathname.includes('404')) {
		return siteDefaults('Página não encontrada')
	} else if (pathname.includes('acompanhante/')) {
		const { city, displayName, title, neighborhood, payment } = girl
		return {
			title: `Acompanhante ${city} | ${displayName}`,
			description: `${displayName}, ${title}. Venha me conhecer. Sou de ${neighborhood} e atendo na região de ${city}. ${payment.match(/cartão/i) ? 'Aceito cartão!' : ''}`,
			keywords: `acompanhantes, garota de programa, garota de programa ${city}, garota de programa ${neighborhood}, acompanhante ${city}, acompanhante ${neighborhood}, fotos originais`,
		}
	} else {
		const city = activeCity ? activeCity.name : false
		return {
			title: city ? `Acompanhantes ${city}` : `Acompanhantes na sua cidade`,
			description: `Conheça as acompanhantes mais lindas ${city ? `de ${city}` : 'da sua cidade'}. Acesse e pesquise, todas com fotos originais e muito atenciosas.`,
			keywords: `acompanhantes, garotas de programa, garotas de programa ${city || 'na sua cidade'}, acompanhante ${city || 'na sua cidade'}, fotos originais, aceita cartão, cartão de crédito`,
		}
	}
}