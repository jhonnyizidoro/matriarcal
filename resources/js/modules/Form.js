import VMasker from 'vanilla-masker'
import Sortable from 'sortablejs'

export const initLabels = () => {
	const inputs = document.querySelectorAll('.form__input, .form__select, .form__textarea')
	inputs.forEach(input => {
		checkInputLabel(input)
		input.addEventListener('input', () => checkInputLabel(input))
		input.addEventListener('DOMSubtreeModified', () => checkInputLabel(input))

		if (input.required) {
			input.previousElementSibling.innerText += ' *'
		}
	})
}

const checkInputLabel = input => {
	if (input.value) {
		input.previousElementSibling.classList.add('form__label--active')
	} else {
		input.previousElementSibling.classList.remove('form__label--active')
	}
}

export const fetchCitiesOnStateChange = async () => {
	const stateSelect = document.querySelector('select#state')
	const citySelect = document.querySelector('select#cityId')
	if (stateSelect && citySelect) {
		if (stateSelect.value) {
			await fetchCities(citySelect, stateSelect)
			Array.from(citySelect.children).forEach(option => {
				if (option.value === stateSelect.dataset.selected) {
					option.selected = true
					checkInputLabel(citySelect)
				}
			})
		}
		stateSelect.addEventListener('input', () => stateSelect.value && fetchCities(citySelect, stateSelect))
	}
}

const fetchCities = async (citySelect, stateSelect) => {
	Array.from(citySelect.children).forEach(option => option.innerText && option.remove())
	const { value } = stateSelect
	const response = await fetch(`/api/cidades/${value}`)
	const cities = await response.json()
	cities.forEach(({ id, name }) => {
		const option = document.createElement('option')
		option.value = id
		option.innerText = name
		citySelect.append(option)
	})
}

export const applyMasks = () => {
	const inputs = document.querySelectorAll('[data-mask]')

	inputs.forEach(input => {
		const { mask } = input.dataset
		if (mask === 'phone') {
			input.addEventListener('input', () => {
				const { value } = input
				if (value.length > 14) {
					VMasker(input).unMask()
					VMasker(input).maskPattern('(99) 99999-9999')
					input.value = VMasker.toPattern(value, '(99) 99999-9999')
				} else {
					VMasker(input).unMask()
					VMasker(input).maskPattern('(99) 9999-9999')
					input.value = VMasker.toPattern(value, '(99) 9999-9999')
				}
			})
		}
	})
}

export const sortableImages = () => {
	const wrapper = document.querySelector('.girl__form__sortable')
	if (wrapper) {
		Sortable.create(wrapper, {
			animation: 150,
		})
	}
}

export const sortableFileInput = () => {
	const input = document.querySelector('input[type="file"]')
	const sortable = document.querySelector('.girl__form__sortable')

	if (input && sortable) {
		input.addEventListener('input', () => {
			Array.from(input.files).forEach(file => {
				const reader = new FileReader()
				reader.onloadend = async () => {
					const base64 = reader.result
					const response = await fetch('/api/upload', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ file: base64 }),
					})
					const { filename } = await response.json()
					const sortableItem = document.createElement('div')
					const sortableImage = document.createElement('img')
					const sortableRemove = document.createElement('div')

					sortableItem.classList.add('girl__form__sortable__item')
					sortableImage.classList.add('girl__form__sortable__image')
					sortableRemove.classList.add('girl__form__sortable__remove')
					sortableImage.src = `/storage/${filename}`
					sortableRemove.innerText = 'x'

					sortableItem.append(sortableImage)
					sortableItem.append(sortableRemove)
					sortable.append(sortableItem)

					attachEventToSortableItems()
				}
				reader.readAsDataURL(file)
			})
		})

		const form = sortable.closest('form')
		form.addEventListener('submit', () => {
			const images = form.querySelectorAll('.girl__form__sortable__image')
			images.forEach(image => {
				const input = document.createElement('input')
				input.value = image.src
				input.name = 'image'
				input.type = 'hidden'
				form.append(input)
			})
		})
	}
}

export const attachEventToSortableItems = () => {
	const buttons = document.querySelectorAll('.girl__form__sortable__remove')
	buttons.forEach(button => {
		button.addEventListener('click', () => button.parentElement.remove())
	})
}

export const initCheckboxes = () => {
	const checkboxes = document.querySelectorAll('.checkbox__input')
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('input', () => {
			if (checkbox.checked) {
				checkbox.previousElementSibling.classList.add('checkbox__label--active')
			} else {
				checkbox.previousElementSibling.classList.remove('checkbox__label--active')
			}
		})
	})
}