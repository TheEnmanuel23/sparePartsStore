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
	let email = document.querySelector('#email').value || ''
	let subject = document.querySelector('#subject').value || ''
	let comments = document.querySelector('#comments').value || ''

	fetch('/sendemail', {
		method: 'POST',
		body: JSON.stringify({ name, email, subject, comments }),
		headers: new Headers({ "Content-Type": "application/json" })
	})
	.then(res => {
		if (res.status && res.status == 200) {
			sentEmail()
		}		
	})
	.catch(err => {
		Materialize.toast('No se logró enviar el correo, intente más tarde.', 3000, 'rounded')
		console.log(err)
	})
}

function sentEmail () {
	let htmlSentEmail = `
		<div class="row">
			<h4 class="green-text center">Gracias por escribirnos, te responderemos pronto!</h4>
		</div>
	`

	let content = document.querySelector('#content')
  content.innerHTML = htmlSentEmail

  Materialize.toast('Correo enviado!', 3000, 'rounded')
}