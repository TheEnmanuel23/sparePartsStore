import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import generatePdf from './generatePdfDetalleCompra'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/miscompras/:id', PreLoading, loadFactura, (ctx, next) => {
	let content = document.querySelector('#content')

  let html = template(ctx.factura)
  content.innerHTML = html

  let descargarDetalleFacturaUser = document.querySelector('#descargarDetalleFacturaUser')
  descargarDetalleFacturaUser.addEventListener('click', () => generatePdf(ctx.factura))
})

function loadFactura (ctx, next) {
	db.ref('/usuarioCompras/' + ctx.params.id).once('value').then(snapshot => {
	  let factura = snapshot.val()
	  factura.id = ctx.params.id
    ctx.factura = factura
    next()
	})
}