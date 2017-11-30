import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import currentDate from '../getCurrentDate'
import generatePdf from './generatePdfVentas'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()
var usuariosArray = []
var facturaCurrentShowing = []

page('/ventas', PreLoading, loadUsuarios, loadFacturas, (ctx, next) => {
	let html = template(ctx.facturas)
  let content = document.querySelector('#content')
  content.innerHTML = html

  $('#filtroFechaInicioVenta').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false
  })

  $('#filtroFechaFinalVenta').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false
  })

  let btnFiltrarVentas= document.querySelector('#filtrarVentas')
  let btndescargarVentas= document.querySelector('#descargarVentas')
  btnFiltrarVentas.addEventListener('click', filtrarVentasEvent)
  btndescargarVentas.addEventListener('click', generatePdfEvent)
})

function loadUsuarios (ctx, next) {
	db.ref('usuarios').once('value').then(snapshot => {
	  let store = snapshot.val()
	  let keys = Object.keys(store)

	  let usuarios = []

	  keys.map(key => {
	  	let usuario = store[key]
	  	usuario.id = key
	  	usuarios.push(usuario)
	  })
	  ctx.usuarios = usuarios
	  usuariosArray = usuarios
    next()
	})
}

function loadFacturas (ctx, next)  {
	db.ref('usuarioCompras').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let facturas = []

		keys.map(key => {
			let factura = store[key]
			factura.id = key
			factura.usuario = ctx.usuarios.find(item => item.id == factura.usuario)
			facturas.push(factura)
		})

		ctx.facturas = facturas
		facturaCurrentShowing = facturas
		next()
	})
}

function filtrarVentasEvent () {
	let selectedDateInicio = document.querySelector('#filtroFechaInicioVenta').value
	let selectedDateFinal = document.querySelector('#filtroFechaFinalVenta').value
	let total1 = document.querySelector('#cantidadInicial').value
	let total2 = document.querySelector('#cantidadFinal').value

	let loading = `
	  <div class="preloader-wrapper big active">
	    <div class="spinner-layer spinner-blue-only">
	      <div class="circle-clipper left">
	        <div class="circle"></div>
	      </div><div class="gap-patch">
	        <div class="circle"></div>
	      </div><div class="circle-clipper right">
	        <div class="circle"></div>
	      </div>
	    </div>
	  </div>`

  let bodyVentas = document.querySelector('#bodyVentas')
  bodyVentas.innerHTML = loading

	filtrarVentas(parseInt(total1), parseInt(total2), selectedDateInicio, selectedDateFinal)
}

function filtrarVentas (cantidadInicial = 0, cantidadFinal = 0, selectedDateInicio = null, selectedDateFinal = null) {
	db.ref('usuarioCompras').once('value').then(snapshot => {
		let store = snapshot.val()
		let keys = Object.keys(store)

		let facturas = []

		keys.map(key => {
			let factura = store[key]
			factura.id = key
			facturas.push(factura)
		})

		let facturasFiltered = []

		if (cantidadInicial > 0 && cantidadFinal > 0) {
			facturasFiltered = facturas.filter(item => item.total >= cantidadInicial && item.total <= cantidadFinal)
		}
		else if (cantidadInicial > 0) {
			facturasFiltered = facturas.filter(item => item.total >= cantidadInicial)	
		}
		else if (cantidadFinal > 0) {
			facturasFiltered = facturas.filter(item => item.total <= cantidadFinal)	
		}
		else {
			facturasFiltered = facturas
		}

		facturasFiltered = getDataFilteredByDate(selectedDateInicio, selectedDateFinal, facturasFiltered)

		facturasFiltered.map(item => item.usuario = usuariosArray.find(us => us.id == item.usuario))		
		facturaCurrentShowing = facturasFiltered

		let bodyVentas = document.querySelector('#bodyVentas')
  	bodyVentas.innerHTML = rowFiltered(facturasFiltered)
	})
}

function rowFiltered (facturas) {
	let rows = ''
  let countRow = 1

	facturas.map(item => {
    rows +=  `
     <tr>
      <td>${countRow++}</td>
      <td><a href="/ventas/${item.id}">${item.id}</a></td>
      <td>${item.fecha}</td>
      <td>${item.total}$</td>
      <td>${item.articulos.length}</td>
      <td>${item.usuario.displayName}</td>
    </tr>
    `
	})

 	return rows
}

function generatePdfEvent () {
	generatePdf(facturaCurrentShowing)
}

function getDataFilteredByDate (dateStart, dateEnd, facturasFiltered) {
	if (dateStart && dateEnd) {
		let fechaInicio = new Date(dateStart)
		let fechaFinal = new Date(dateEnd)

		facturasFiltered = facturasFiltered.filter(item => {
			let fechaFormated = moment(item.fecha, 'DD/MM/YYYY').toDate()
			let rango = moment.range(fechaInicio, fechaFinal)
			return rango.contains(fechaFormated)
		})

	} else if (dateStart) {
		let fechaInicio = new Date(dateStart)

		facturasFiltered = facturasFiltered.filter(item => {
				let fechaFormated = moment(item.fecha, 'DD/MM/YYYY').toDate()
				let rango = moment.range(fechaInicio, null)
				return rango.contains(fechaFormated)
			}) 
		} else if (dateEnd) {
			let fechaFinal = new Date(dateEnd)
			
			facturasFiltered = facturasFiltered.filter(item => {
				let fechaFormated = moment(item.fecha, 'DD/MM/YYYY').toDate()
				let rango = moment.range(null, fechaFinal)
				return rango.contains(fechaFormated)
			}) 
		}

	return facturasFiltered
}