import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'

page('/login', (ctx, next) => {
	 let content = document.querySelector('#content')
	  content.innerHTML = template()

	  let btnLogin = document.querySelector('#googleLogin')
	  btnLogin.addEventListener('click', () => {
	  	let provider = new firebase.auth.GoogleAuthProvider()

	  	firebase.auth().signInWithPopup(provider)
				.then(result => {
					let user = result.user
					let userLoginContainer = document.querySelector('#userLoginContainer')

					let html = `Bienvenido, ${user.displayName}`
					userLoginContainer.innerHTML = html
					page.redirect('/')
				})
				.catch((err) => console.log(err.message) )
	  })
})