import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/ventas', PreLoading, loadFacturas, (ctx, next) => {
	let html = template(ctx.facturas)
  let content = document.querySelector('#content')
  content.innerHTML = html
})

function loadFacturas (ctx, next)  {
	db.ref('usuarioCompras').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let facturas = []

		keys.map(key => {
			let factura = store[key]
			factura.id = key
			facturas.push(factura)
		})
		
		ctx.facturas = facturas
		next()
	})
}