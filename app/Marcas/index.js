import firebase from 'firebase'
import config from '../../config'
import template from './template'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

const loadMarcas = async () => {
  try {
    await db.ref('marcas').once('value').then(snapshot => {
      let marcas = snapshot.val() || []
      let html = template(marcas)
      let menu = document.querySelector('#menu')
      menu.innerHTML = html
    })
  } catch (err) {
    console.log(err)
  }
}

export default loadMarcas