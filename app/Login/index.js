import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import login from './login'

page('/login', (ctx, next) => {
	 let content = document.querySelector('#content')
	  content.innerHTML = template()

	  let btnLogin = document.querySelector('#googleLogin')

	  btnLogin.addEventListener('click', login)
})