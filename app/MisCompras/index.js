import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/miscompras', PreLoading, (ctx, next) => {
	let html = template()
  let content = document.querySelector('#content')
  content.innerHTML = html
})