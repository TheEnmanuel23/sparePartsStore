import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/ventas/:id', PreLoading, loadFactura, loadUsuario, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template(ctx.factura)
  content.innerHTML = html
})

function loadUsuario (ctx, next) {
	db.ref('/usuarios/' + ctx.factura.usuario).once('value').then(snapshot => {
	  let usuario = snapshot.val()
	  usuario.id = ctx.factura.usuario
    ctx.factura.usuario = usuario
    next()
	})
}

function loadFactura (ctx, next) {
	db.ref('/usuarioCompras/' + ctx.params.id).once('value').then(snapshot => {
	  let factura = snapshot.val()
	  factura.id = ctx.params.id
    ctx.factura = factura
    next()
	})
}