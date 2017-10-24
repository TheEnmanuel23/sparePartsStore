import firebase from 'firebase'

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
		}).catch(function(error) {
		console.log(err.message)
	})
}
export default logout