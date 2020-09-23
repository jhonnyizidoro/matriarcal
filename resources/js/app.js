import 'share-api-polyfill'
import { initGirlCarousel } from './modules/Carousel'
import { initAlertMessage } from './modules/Alert'
import { addActiveClassToNavItem, initHamburgerButton } from './modules/Nav'
import { lazyLoadImages, setSourceByDevice } from './modules/Image'
import { setWhatsAppLink, initShareButtons, googleAnalytics } from './modules/Social'
import {
	initLabels,
	fetchCitiesOnStateChange,
	applyMasks,
	sortableImages,
	sortableFileInput,
	attachEventToSortableItems,
	initCheckboxes,
} from './modules/Form'

document.addEventListener('DOMContentLoaded', () => {
	initLabels()
	lazyLoadImages()
	setSourceByDevice()
	googleAnalytics()
})

window.addEventListener('load', () => {
	fetchCitiesOnStateChange()
	applyMasks()
	sortableImages()
	sortableFileInput()
	attachEventToSortableItems()
	initCheckboxes()
	addActiveClassToNavItem()
	initGirlCarousel()
	initHamburgerButton()
	setWhatsAppLink()
	initShareButtons()
	initAlertMessage()
})