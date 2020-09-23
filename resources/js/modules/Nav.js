export const addActiveClassToNavItem = () => {
	const links = document.querySelectorAll('.nav__link')
	links.forEach(link => {
		if (link.href === window.location.href) {
			link.classList.add('nav__link--active')
		}
	})
}

export const initHamburgerButton = () => {
	const hamburger = document.querySelector('.hamburger')
	const nav = document.querySelector('.nav')
	const menu = document.querySelector('.menu__links')
	if (hamburger) {
		hamburger.addEventListener('click', () => {
			if (hamburger.classList.contains('hamburger--active')) {
				hamburger.classList.remove('hamburger--active')
				if (nav) {
					nav.classList.remove('nav--active')
				} else {
					menu.classList.remove('nav--active')
				}
			} else {
				hamburger.classList.add('hamburger--active')
				if (nav) {
					nav.classList.add('nav--active')
				} else {
					menu.classList.add('nav--active')
				}
			}
		})
	}
}