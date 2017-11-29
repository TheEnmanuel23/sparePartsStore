import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/emails/:id', PreLoading, loadEmail, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template(ctx.email)
  content.innerHTML = html
})

function loadEmail (ctx, next) {
	db.ref('/correosEnviados/' + ctx.params.id).once('value').then(snapshot => {
	  let email = snapshot.val()
    ctx.email = email
    next()
	})
}