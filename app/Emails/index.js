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
})