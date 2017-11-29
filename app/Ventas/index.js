import page from 'page'
import firebase from 'firebase'
import config from '../../config'
import template from './template'
import PreLoading from '../Loader'
import currentDate from '../getCurrentDate'

if (!firebase.apps.length) { firebase.initializeApp(config.firebase) }

const db = firebase.database()

page('/ventas', PreLoading, loadFacturas, (ctx, next) => {
	let html = template(ctx.facturas)
  let content = document.querySelector('#content')
  content.innerHTML = html

  $('#filtroFechaVenta').pickadate({
    selectMonths: true,
    selectYears: 15,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false
  })

  let btnFiltrarVentas= document.querySelector('#filtrarVentas')
  btnFiltrarVentas.addEventListener('click', filtrarVentasEvent)
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

function filtrarVentasEvent () {
	let selectedDate = document.querySelector('#filtroFechaVenta').value
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

	filtrarVentas(parseInt(total1), parseInt(total2), selectedDate)
}

function filtrarVentas (cantidadInicial = 0, cantidadFinal = 0, selectedDate = null) {
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

		if (selectedDate) {
			facturasFiltered = facturasFiltered.filter(item => item.fecha == currentDate(new Date(selectedDate)))
		}

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
    </tr>
    `
	})

 	return rows
}