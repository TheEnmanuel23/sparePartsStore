const addEventChange = () => {
	let articulos = document.Car.articles

	articulos.map(articulo => {
		let elementHtml = document.querySelector(`#articulo-${articulo.id}`)

		elementHtml.addEventListener('change', (e) => {
			let value = elementHtml.value

			if (!value || value == 0) {
				elementHtml.value = 1
				value = 1
			}

			desminuirCantidad(articulo, value)
		})
	})
}

function desminuirCantidad (articulo, value) {
	let totalHtml = document.querySelector('#totalCompra')
	let subtotalHtml = document.querySelector('#subtotalCompra')
	let totalRowHtml = document.querySelector(`#rowTotal-${articulo.id}`)

	let subtotalAntesDeModificar = parseInt(subtotalHtml.innerText)
	subtotalAntesDeModificar = subtotalAntesDeModificar - (articulo.cantidad * articulo.inventario.precio_venta)

	articulo.cantidad = value

	let totalRow = articulo.cantidad * articulo.inventario.precio_venta
	totalRowHtml.innerText = totalRow

	let subtotalModificado = subtotalAntesDeModificar + totalRow
	subtotalHtml.innerText = subtotalModificado

	totalHtml.innerText = subtotalModificado + 2
}

export default addEventChange