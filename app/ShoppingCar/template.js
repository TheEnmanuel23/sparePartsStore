const template = () => {
  if (document.Car.articles.length <= 0) {
    return '<h4 class="red-text center">El carrito está vacío</<h4>'
  }

  let articulos = document.Car.articles
  let rows = ''
  let total = 0

	articulos.map(item => {
    let totalRow = item.cantidad * item.inventario.precio_venta
    rows +=  `
     <tr id=${item.id}>
      <td>${item.id}</td>
      <td>${item.descripcion}</td>
      <td>${item.inventario.precio_venta}$</td>
      <td>${item.cantidad}</td>
      <td>${totalRow}$</td>
    </tr>
    `
    total += totalRow
  })

  let table = `
  <table class="striped">
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

  let card = `
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><i class="material-icons">shopping_basket</i> Lista de compras</span>
          ${table}
        </div>
        <div class="card-action">
          <a class="waves-effect green darken-2 btn"><i class="material-icons right">shopping_basket</i>Comprar</a>
          <a id="vaciar-carrito" class="waves-effect red accent-3 btn"><i class="material-icons right">remove_shopping_cart</i>Vaciar</a>          
          <div class="chip right">
            Total: ${total}$
          </div>
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template