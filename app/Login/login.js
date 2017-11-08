import firebase from 'firebase'
import logout from'./logout'
import page from 'page'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database().ref('usuarios')

const login = () => {
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
			logout()
			registerUser(user)
			page.redirect('/')
		})
		.catch((err) => console.log(err.message) )
}

function registerUser (user) {
	let today = new Date()

	db.child(user.uid).set({
		email: user.email,
		lastAccess: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
		isAdmin: false
	})
}

export default login