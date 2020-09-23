export const initAlertMessage = () => {
	const alert = document.querySelector('.alert')
	if (alert) {
		alert.classList.add('alert--visible')
		setTimeout(() => {
			alert.classList.remove('alert--visible')
		}, 5000)
		alert.addEventListener('click', () => {
			alert.classList.remove('alert--visible')
		})
	}
}