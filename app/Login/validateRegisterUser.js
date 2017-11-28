import firebase from 'firebase'
import config from '../../config'
import { addAdminMenu } from './adminMenu'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database().ref('usuarios')

const validateRegisterUser = (user) => {
	window.currentUserId = user.uid
	
	db.child(user.uid).once('value').then(snapshot => {
		let data = snapshot.val()
		
		if (data) {
			if (data.isAdmin) {
				addAdminMenu()
			}

			window.isAdmin = data.isAdmin
		} else {
			let today = new Date()
			let newUser = {
				email: user.email,
				lastAccess: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
				isAdmin: false
			}

			db.child(user.uid).set(newUser)
			window.isAdmin = false
		}
	})
}

export default validateRegisterUser