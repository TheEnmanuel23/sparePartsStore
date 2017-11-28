import page from 'page'
import template from './template'
import firebase from 'firebase'
import config from '../../config'
import currentDate from '../getCurrentDate'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

page('/contacto', () => {
  let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html

  let enviarContacto = document.querySelector('#enviarContacto')
  enviarContacto.addEventListener('click', sendEmail)
  
  loadSubjects()
})

function sendEmail () {
	let optionsAsuntos = document.querySelector('#optionsAsuntos')
	let subject = optionsAsuntos.options[optionsAsuntos.selectedIndex].value
	let subjectText = optionsAsuntos.options[optionsAsuntos.selectedIndex].innerText
  let name = document.querySelector('#name').value || ''
	let email = document.querySelector('#email').value || ''
	let comments = document.querySelector('#comments').value || ''
	let articulo = document.querySelector('#articulo').value || ''
	
	fetch('/sendemail', {
		method: 'POST',
		body: JSON.stringify({ name, email, subject: subjectText, comments, articulo }),
		headers: new Headers({ "Content-Type": "application/json" })
	})
	.then(res => {
		if (res.status && res.status == 200) {
			saveEmail({name, email, subject, comments, articulo})
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

function loadSubjects () {
	firebase.database().ref('asuntos').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let options = '<option value="" disabled selected>Seleccionar asunto</option>'
		keys.map(key => {
			options += `<option value=${key}>${store[key].descripcion}</option>`
		})

		let optionsAsuntos = document.querySelector('#optionsAsuntos')
		optionsAsuntos.innerHTML = options
		$('#optionsAsuntos').material_select();
	})
}

function saveEmail (emailData) {
	firebase.database().ref('correosEnviados').push({
		name: emailData.name,
		email: emailData.email,
		subject: emailData.subject,
		comments: emailData.comments,
		articulo: emailData.articulo,
		date: currentDate()
	})
}