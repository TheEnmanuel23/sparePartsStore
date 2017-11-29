import page from 'page'
import template from './template'
import firebase from 'firebase'
import config from '../../config'
import currentDate from '../getCurrentDate'

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
      if (!window.currentUserId) return alert('Inicie sesión para realizar la compra.')
      actualizarInventario(document.Car.articles)
      realizarCompra()
    })

    addEventRemoveOfShoppingCar()
  }
})

function realizarCompra () {
  let aceptoTerminos = document.querySelector('#terminos').checked

  if (!aceptoTerminos) {
    return alert("Tiene que aceptar los términos y condiciones para realizar la compra.")
  }

  firebase.database().ref('usuarioCompras').push({
    fecha: currentDate(),
    usuario: window.currentUserId,
    total: document.querySelector('#totalCompra').innerText,
    articulos: document.Car.articles.map(item => {
      return {
        id: item.id,
        cantidad: item.cantidad,
        detalle: item.detalle,
        descripcion: item.descripcion,
        tipo: item.tipo,
        idModelo: item.idModelo,
        precio_venta: item.inventario.precio_venta
      }
    })
  })

  document.Car.articles = []
  alert('Compra realizada con éxito!')
  page.redirect('/')
}

function actualizarInventario (articulos) {
  const db = firebase.database().ref('inventario')
  articulos.map(item => {
    db.child(item.inventario.id).update({
      cantidad_vendida: item.inventario.cantidad_vendida + item.cantidad,
      stock: item.inventario.stock - item.cantidad
    })  
  })  
}

function addEventRemoveOfShoppingCar () {
  let articulosToRemove = document.Car.articles

  articulosToRemove.map(item => {
    let element = document.querySelector(`#del-${item.id}`)
    element.addEventListener('click', () => {
      if (confirm('¿Está seguro de quitar este artículo del carrito?') ==  true) {
        document.Car.removeOfCar(item)
        page.redirect('/shoppingcar')
      }
    })
  })
}