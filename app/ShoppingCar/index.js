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
 $('#modalComprar').modal()
 $('.materialboxed').materialbox();
 Materialize.updateTextFields();

cargarMeses()

  let vaciarCarrito = document.querySelector('#vaciar-carrito')
  let btnListoCar  = document.querySelector('#listoCar')
  let btnComprar  = document.querySelector('#comprar')
  
  if (vaciarCarrito || btnComprar) {
    vaciarCarrito.addEventListener('click', () => {
    	if (confirm('¿Está seguro de vaciar el carrito?') ==  true) {
    		document.Car.articles = []
    		page.redirect('/shoppingcar')
    	}
    })

    btnListoCar.addEventListener('click', () => {
      if (!window.currentUserId) return alert('Inicie sesión para realizar la compra.')
      $('#modalComprar').modal('open')
    })

    btnComprar.addEventListener('click', () => {
      let allFieldsFill = validateFieldsCar()
      if (!allFieldsFill) return alert('Asegúrese de tener todos los campos completos.')

      let aceptoTerminos = document.querySelector('#terminos').checked

      if (!aceptoTerminos) {
        return alert("Tiene que aceptar los términos y condiciones para realizar la compra.")
      }

      actualizarInventario(document.Car.articles)
      realizarCompra()
      clearFieldsCar()
    })

    addEventRemoveOfShoppingCar()
  }
})

function realizarCompra () {

  firebase.database().ref('usuarioCompras').push({
    fecha: currentDate(),
    usuario: window.currentUserId,
    total: document.querySelector('#totalCompra').innerText,
    direccionEnvio: document.querySelector('#direccionEnvio').value,
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
  $('#modalComprar').modal('close')

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

function cargarMeses () {
  let optionsMesExpiracionCar = document.querySelector('#optionsMesExpiracionCar')
  let meses = [
   { id: 1, mes: "Enero", selected: true }, {id: 2, mes: "Febrero"}, {id:3, mes: "Marzo"}, {id: 4, mes: "Abril"},
   { id: 5, mes: "Mayo"}, {id: 6, mes: "Junio"}, {id:7, mes: "Julio"}, {id: 8, mes: "Agosto"},
   { id: 9, mes: "Septiembre"}, {id: 10, mes: "Octubre"}, {id:11, mes: "Noviembre"}, {id: 12, mes: "Diciembre"}
  ]

  let options = ''

  meses.map(mes => {
    options += `<option value="${mes.id}" ${ mes.selected ? 'selected' : '' }>${mes.mes}</option>`
  })

  optionsMesExpiracionCar.innerHTML = options

    $('#optionsMesExpiracionCar').material_select();
}

function validateFieldsCar (){
  let direccionEnvio = document.querySelector('#direccionEnvio').value
  let nombreTitular = document.querySelector('#nombreTitular').value
  let numeroTarjeta = document.querySelector('#numeroTarjeta').value
  let anioExpiracion = document.querySelector('#anioExpiracion').value
  let codigoSeguridad = document.querySelector('#codigoSeguridad').value

  let optionsMesExpiracionCar = document.querySelector('#optionsMesExpiracionCar')
  let mesExpiracion = optionsMesExpiracionCar.options[optionsMesExpiracionCar.selectedIndex].value
  
  return direccionEnvio && nombreTitular && numeroTarjeta && mesExpiracion && anioExpiracion && codigoSeguridad
}

function clearFieldsCar () {
  document.querySelector('#direccionEnvio').value = ''
  document.querySelector('#nombreTitular').value = ''
  document.querySelector('#numeroTarjeta').value = ''
  document.querySelector('#anioExpiracion').value = ''
  document.querySelector('#codigoSeguridad').value  = ''
}