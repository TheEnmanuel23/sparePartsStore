import firebase from 'firebase'
import { removeAdminMenu } from './adminMenu'
import page from 'page'

const logout = () => {
	let salirBtn = document.querySelector('#salir')

	if (salirBtn) {
		salirBtn.addEventListener('click', (e) => {
			e.preventDefault()
			signOut()
		})
	}
}

function signOut () {
	firebase.auth().signOut().then(function() {
		let loginDropdown = document.querySelector('#loginDropdown')
		let dropdownAccount = document.querySelector('#dropdownAccount')

	  loginDropdown.innerHTML = '<li><a href="/login">Entrar</a></li>'
	  dropdownAccount.innerHTML = `
	  	<i class="material-icons">perm_identity</i>
      <i class="material-icons right">arrow_drop_down</i>`

      if (window.isAdmin) {
      	removeAdminMenu()
      }
      document.Car.articles = []

		}).catch(function(error) {
		console.log(err.message)
	})
}
export default logout