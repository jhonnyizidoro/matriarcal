import Glide from '@glidejs/glide'

export const initGirlCarousel = () => {
	const carousel = document.querySelector('.carousel')
	if (carousel) {
		const glide = new Glide('.carousel', { type: 'carousel', animationDuration: 500 })
		glide.on(['run', 'mount.after'], () => adjustHeightBasedOnCurrentSlide(glide, carousel))
		window.addEventListener('resize', () => adjustHeightBasedOnCurrentSlide(glide, carousel))
		window.addEventListener('orientationchange', () => setTimeout(() => adjustHeightBasedOnCurrentSlide(glide, carousel), 450))
		glide.mount()
	}
}

const adjustHeightBasedOnCurrentSlide = (glide, carousel) => {
	const slides = getCarouselSlides()
	const height = slides[glide.index + 1].height
	if (height) {
		carousel.style.height = `${height}px`
	}
}

const getCarouselSlides = () => document.querySelectorAll('.carousel__slide')