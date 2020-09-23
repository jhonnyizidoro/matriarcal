export const initShareButtons = () => {
	const buttons = document.querySelectorAll('[data-share]')
	const text = document.querySelector('meta[name="description"]').content
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			window.navigator.share({
				text,
				title: document.title,
				url: window.location.href,
			}, {
				language: 'pt',
			})
		})
	})
}

export const setWhatsAppLink = () => {
	const links = document.querySelectorAll('a[data-whatsapp]')
	const endpoint = window.innerWidth < 1000 ? 'https://api.whatsapp.com' : 'https://web.whatsapp.com'
	const text = encodeURIComponent(`(${window.location.href}) Olá, vi você no Matriarcal e gostaria de mais informações.`)
	links.forEach(link => link.href = `${endpoint}/send?phone=55${link.dataset.whatsapp}&text=${text}`)
}

export const googleAnalytics = () => {
	window.dataLayer = window.dataLayer || []
	window.gtag = function() {
		window.dataLayer.push(arguments)
	}
	gtag('js', new Date())
	gtag('config', 'UA-178746175-1')
}