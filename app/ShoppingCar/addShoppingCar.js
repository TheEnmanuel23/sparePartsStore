const addShoppingCar = (articulo, cantidad = 0) => {
	if (cantidad <= 0) return alert('Seleccione una cantidad mayor a cero.')
	
	if (document.Car.articles.length <= 0) {
		articulo.cantidad = cantidad
		document.Car.addToCar(articulo)
		Materialize.toast('Artículo agregado al carrito!', 3000, 'rounded')
		return
	}

	let art = document.Car.articles.find(item => {
		return item.id == articulo.id
	})

	if (art) {
		art.cantidad = parseInt(art.cantidad) + parseInt(cantidad)
	} else {
		articulo.cantidad = cantidad
		document.Car.addToCar(articulo)
	}

	Materialize.toast('Artículo agregado al carrito!', 3000, 'rounded')
}

export default addShoppingCar