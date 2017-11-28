import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/emails', PreLoading, loadEmails, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template(ctx.emails)
  content.innerHTML = html

  loadSubjects()
  $('#filtroFechaInicioCorreo').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false
  })
})

function loadSubjects () {
	firebase.database().ref('asuntos').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let options = ''
		keys.map(key => {
			options += `<option value=${key}>${store[key].descripcion}</option>`
		})
		options += '<option value="td" selected>Todo</option>'
		let optionsAsuntos = document.querySelector('#optionsAsuntosFilter')
		optionsAsuntos.innerHTML = options
		$('#optionsAsuntosFilter').material_select();
	})
}

function loadEmails (ctx, next) {
	firebase.database().ref('correosEnviados').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let emails = []

		keys.map(key => {
			let email = store[key]
			email.id = key
			emails.push(email)
		})

		let emailSorted = emails.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime()
		})

		ctx.emails = emailSorted
		next()
	})
}