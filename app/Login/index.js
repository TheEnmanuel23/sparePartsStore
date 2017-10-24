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
					let user = result.user.providerData[0]

					let loginDropdown = document.querySelector('#loginDropdown')
					let dropdownAccount = document.querySelector('#dropdownAccount')

					let html = `Bienvenido, ${user.displayName} <img class="photoURL" src=${user.photoURL} alt=${user.displayName} />`
					dropdownAccount.innerHTML = `${html} <i class="material-icons right">arrow_drop_down</i>`					

					let salir = ` <li><a id="salir" href="!#">Salir</a></li>`
					loginDropdown.innerHTML = salir

					let salirBtn = document.querySelector('#salir')
					if (salirBtn) {
					salirBtn.addEventListener('click', (e) => {
						e.preventDefault()

						firebase.auth().signOut().then(function() {
								  loginDropdown.innerHTML = '<li><a href="/login">Entrar</a></li>'
								  dropdownAccount.innerHTML = `<i class="material-icons">perm_identity</i>
                          <i class="material-icons right">arrow_drop_down</i>`
								}).catch(function(error) {
								console.log(err.message)
							});
						})
					}

					page.redirect('/')
				})
				.catch((err) => console.log(err.message) )
	  })
})