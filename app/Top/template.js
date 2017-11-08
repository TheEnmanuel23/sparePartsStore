const template = (articulos) => {
  let rows = ''
  let countRow = 1

	articulos.map(item => {
    rows +=  `
     <tr id=${item.id}>
      <td>${countRow++}</td>
      <td>${item.id}</td>
      <td><a href="/article/${item.id}">${item.descripcion}</a></td>
      <td>${item.tipo.descripcion}</td>
      <td>${item.inventario.precio_venta}$</td>
      <td class="center">${item.inventario.cantidad_vendida}</td>
    </tr>
    `
  })

  let table = `
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Id</th>
        <th>Artículo</th>
        <th>Tipo</th>
        <th>Precio</th>
        <th>Cantidad Vendida</th>
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
          <span class="card-title"><i class="material-icons">vertical_align_top</i> Top 10 - Los más vendidos</span>
          ${table}
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template