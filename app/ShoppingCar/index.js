import page from 'page'
import template from './template'
import firebase from 'firebase'
import config from '../../config'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

page('/shoppingcar',  () => {
	let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html

 $('.modal').modal()

  let vaciarCarrito = document.querySelector('#vaciar-carrito')
  let btnComprar  = document.querySelector('#comprar')
  
  if (vaciarCarrito || btnComprar) {
    vaciarCarrito.addEventListener('click', () => {
    	if (confirm('¿Está seguro de vaciar el carrito?') ==  true) {
    		document.Car.articles = []
    		page.redirect('/shoppingcar')
    	}
    })

    btnComprar.addEventListener('click', () => {
      if (!window.currentUserId) return alert('Inicie sesión pare realizar la compra.')
      realizarCompra()
    })
  }
})

function realizarCompra () {
  let aceptoTerminos = document.querySelector('#terminos').checked

  if (!aceptoTerminos) {
    return alert("Tiene que aceptar los términos y condiciones para realizar la compra.")
  }

  firebase.database().ref('usuarioCompras').push({
    fecha: dateNow(),
    usuario: window.currentUserId,
    articulos: document.Car.articles.map(item => {
      return {
        id: item.id,
        cantidad: item.cantidad,
        detalle: item.detalle,
        descripcion: item.descripcion,
        tipo: item.tipo,
        idModelo: item.idModelo
      }
    })
  })

  document.Car.articles = []
  alert('Compra realizada con éxito!')
  page.redirect('/')
}

function dateNow () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = mm + '/' + dd + '/' + yyyy;
  return today
}