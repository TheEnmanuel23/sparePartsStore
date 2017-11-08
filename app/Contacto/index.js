import page from 'page'
import template from './template'

page('/contacto', () => {
  let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html

  let enviarContacto = document.querySelector('#enviarContacto')
  enviarContacto.addEventListener('click', sendEmail)
})

function sendEmail () {
  let name = document.querySelector('#name').value || ''
	let lastName = document.querySelector('#lastName').value || ''
	let email = document.querySelector('#email').value || ''
	let subject = document.querySelector('#subject').value || ''
	let comments = document.querySelector('#comments').value || ''

	fetch('/sendemail', {
		method: 'POST',
		body: JSON.stringify({ name, lastName, email, subject, comments }),
		headers: new Headers({ "Content-Type": "application/json" })
	})
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.log(err)
	})
}