const template = () => {
  if (document.Car.articles.length <= 0) {
    return '<h4 class="red-text center">El carrito está vacío</<h4>'
  }

  let articulos = document.Car.articles
  let rows = ''

	articulos.map(item => {
    rows +=  `
     <tr>
      <td>${item.id}</td>
      <td>${item.descripcion}</td>
      <td>${item.inventario.precio_venta}</td>
      <td>${item.cantidad}</td>
      <td>${item.cantidad * item.inventario.precio_venta}</td>
    </tr>
  `
  })

  let table = `
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Articulo</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`

  return table
}

export default template