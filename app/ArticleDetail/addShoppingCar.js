const addShoppingCar = (articulo, cantidad = 0) => {
	if (cantidad <= 0) return alert('Seleccion una cantidad mayor a cero')

	if (document.Car.articles.length <= 0) {
		articulo.cantidad = cantidad
		document.Car.addToCar(articulo)
		return
	}

	for (let i = 0; i < document.Car.articles.length;  i++) {
		let item = document.Car.articles[i]

		if (item.id == articulo.id) {
			document.Car.articles[i].cantidad += cantidad
			break
		}
		else {
			articulo.cantidad = cantidad
			document.Car.addToCar(articulo)
			break
		}
	}
}

export default addShoppingCar