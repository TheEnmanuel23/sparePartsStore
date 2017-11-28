import firebase from 'firebase'
import logout from'./logout'
import page from 'page'
import validateRegisterUser from './validateRegisterUser'

const login = () => {
	let provider = new firebase.auth.GoogleAuthProvider()

	provider.setCustomParameters({
	   'prompt': 'select_account'
	})
	
	firebase.auth().signInWithPopup(provider)
		.then(result => {
			let user = result.user.providerData[0]
			console.log('>>>>>', user)
			let loginDropdown = document.querySelector('#loginDropdown')
			let dropdownAccount = document.querySelector('#dropdownAccount')

			let html = `Bienvenido, ${user.displayName} <img class="photoURL" src=${user.photoURL} alt=${user.displayName} />`
			dropdownAccount.innerHTML = `${html} <i class="material-icons right">arrow_drop_down</i>`					

			let salir = ` <li><a id="salir" href="!#">Salir</a></li>`
			loginDropdown.innerHTML = salir

			logout()
			validateRegisterUser(user)
			
			page.redirect('/')
		})
		.catch((err) => console.log(err.message) )
}

export default login