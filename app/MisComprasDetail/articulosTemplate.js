const articulosTemplate = (articulos) => {
  let rows = ''
  let total = 0
  let rowCount = 1
  
	articulos.map(item => {
    let totalRow = item.cantidad * item.precio_venta
    rows +=  `
     <tr>
      <td>${rowCount}</td>
      <td>${item.descripcion}</td>
      <td>${item.precio_venta}$</td>
      <td>${item.cantidad}</td>
      <td>${totalRow}$</td>
    </tr>
    `
    rowCount++
    total += totalRow
  })

  let table = `
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Artículo</th>
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
          <span class="card-title"><i class="material-icons">shopping_basket</i> Lista de artículos</span>
          ${table}
        </div>
        <div class="card-action">         
          <div class="chip right">
            Total: <span>${total}</span>$
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  return card
}

export default articulosTemplate