import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import currentDate from '../getCurrentDate'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()
var asuntosLoaded = []

page('/emails', PreLoading, loadAsuntos, loadEmails, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template(ctx.emails)
  content.innerHTML = html

  loadSubjectsDropdown(ctx.asuntos)

  $('#filtroFechaCorreo').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false
  })

  let btnFiltrarCorreos = document.querySelector('#filtrarCorreos')
  btnFiltrarCorreos.addEventListener('click', filterEmailsEvent)
})

function loadSubjectsDropdown (asuntos) {
	let keys = Object.keys(asuntos)

	let options = ''
	keys.map(key => {
		options += `<option value=${key}>${asuntos[key].descripcion}</option>`
	})
	options += '<option value="td" selected>Todo</option>'
	let optionsAsuntos = document.querySelector('#optionsAsuntosFilter')
	optionsAsuntos.innerHTML = options
	$('#optionsAsuntosFilter').material_select()
}

function loadAsuntos (ctx, next) {
		firebase.database().ref('asuntos').once('value').then(snapshot => {
			let store = snapshot.val()
			ctx.asuntos = store
			asuntosLoaded = store
			next()
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
			email.subject = ctx.asuntos[email.subject].descripcion
			emails.push(email)
		})

		ctx.emails = emails
		next()
	})
}

function filterEmailsEvent () {
	let optionsAsuntos = document.querySelector('#optionsAsuntosFilter')
	let subjectSelected = optionsAsuntos.options[optionsAsuntos.selectedIndex].value
	let selectedDate = document.querySelector('#filtroFechaCorreo').value

	  let loading = `
	  <div class="preloader-wrapper big active">
	    <div class="spinner-layer spinner-blue-only">
	      <div class="circle-clipper left">
	        <div class="circle"></div>
	      </div><div class="gap-patch">
	        <div class="circle"></div>
	      </div><div class="circle-clipper right">
	        <div class="circle"></div>
	      </div>
	    </div>
	  </div>`

  let bodyEmails = document.querySelector('#bodyEmails')
  bodyEmails.innerHTML = loading

	filteringData(subjectSelected, selectedDate)
}

function filteringData (subjectSelected, selectedDate) {
	firebase.database().ref('correosEnviados').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let emails = []

		keys.map(key => {
			let email = store[key]
			email.id = key
			emails.push(email)
		})

		let arrayFiltered = []

		// verificando los filtros seleccioandos
		if (selectedDate && subjectSelected != 'td') {
			arrayFiltered = emails.filter(item => item.date == currentDate(new Date(selectedDate)))
			arrayFiltered = arrayFiltered.filter(item => item.subject == subjectSelected)
		}
		else if (selectedDate) {
			arrayFiltered = subjectSelected != 'td' ? emails.filter(item => item.subject == subjectSelected) : emails
			arrayFiltered = arrayFiltered.filter(item => item.date == currentDate(new Date(selectedDate)))
		}
		else {
			arrayFiltered = subjectSelected != 'td' ? emails.filter(item => item.subject == subjectSelected) : emails
		}

		if (arrayFiltered.length > 0) {
			arrayFiltered.map(item => item.subject = asuntosLoaded[item.subject].descripcion)
		}

		let bodyEmails = document.querySelector('#bodyEmails')
  	bodyEmails.innerHTML = rowFiltered(arrayFiltered)
	})
}

function rowFiltered (emails) {
	let rows = ''
  let countRow = 1

	emails.map(item => {
    rows +=  `
     <tr id=${item.id}>
      <td>${countRow++}</td>
      <td>${item.subject}</td>
      <td><a href="/emails/${item.id}">${item.name}</a></td>
      <td>${item.date}</td>
    </tr>
    `
  })

  return rows
}