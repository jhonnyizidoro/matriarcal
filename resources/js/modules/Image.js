export const setSourceByDevice = () => {
	const images = document.querySelectorAll('[data-src-mobile][data-src-desktop]')
	images.forEach(image => {
		if (image.dataset.loading === 'lazy') {
			image.dataset.src = window.innerWidth < 1000 ? image.dataset.srcMobile : image.dataset.srcDesktop
		} else {
			image.src = window.innerWidth < 1000 ? image.dataset.srcMobile : image.dataset.srcDesktop
		}
		delete image.dataset.srcMobile
		delete image.dataset.srcDesktop
	})
}

export const lazyLoadImages = () => {
	const images = document.querySelectorAll('img[data-loading="lazy"]')
	const observer = new IntersectionObserver(entries => {
		entries.forEach(({ isIntersecting, target }) => {
			if (isIntersecting && target.src === '' && target.dataset.src) {
				target.src = target.dataset.src
				delete target.dataset.src
			}
		})
	})
	images.forEach(image => observer.observe(image))
}