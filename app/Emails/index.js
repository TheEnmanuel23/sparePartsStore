import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/emails', PreLoading, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template([])
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