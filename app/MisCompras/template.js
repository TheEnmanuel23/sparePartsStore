const template = (facturas) => {
	let rows = ''
  let countRow = 1

	facturas.map(item => {
    rows +=  `
     <tr id=${item.id}>
      <td>${countRow++}</td>
      <td><a href="/miscompras/${item.id}">${item.id}</a></td>
      <td>${item.fecha}</td>
      <td>${item.total}$</td>
      <td>${item.articulos.length}</td>
    </tr>
    `
  })

	let table = `
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>N° Factura</th>
        <th>Fecha</th>
        <th>Total</th>
        <th>Cantidad de material</th>
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
          <span class="card-title"><i class="material-icons">shopping_basket</i> Mis compras</span>
          ${table}
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template