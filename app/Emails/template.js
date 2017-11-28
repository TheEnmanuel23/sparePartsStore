const template = (emails) => {
  let rows = ''
  let countRow = 1
/*
	articulos.map(item => {
    rows +=  `
     <tr id=${item.id}>
      <td>${countRow++}</td>
      <td><a href="/article/${item.id}">${item.descripcion}</a></td>
      <td>${item.tipo.descripcion}</td>
      <td>${item.inventario.precio_venta}$</td>
      <td class="center">${item.inventario.cantidad_vendida}</td>
    </tr>
    `
  })*/

  let table = `
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Artículo</th>
        <th>Tipo</th>
        <th>Precio</th>
        <th>Cantidad Vendida</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>`

  let card = `
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><i class="material-icons">email</i> Lista de correos recibidos</span>
          ${table}
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template