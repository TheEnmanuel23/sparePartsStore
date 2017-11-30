const template = (facturas) => {
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
      <td>${item.usuario.displayName}</td>
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
        <th>Cliente</th>
      </tr>
    </thead>
    <tbody id="bodyVentas">
     ${rows}
    </tbody>
  </table>`

  let card = `
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><i class="material-icons">shopping_basket</i> Ventas realizadas</span>          
            <div class="row">
              <div class="col s12 m6 l6">
                <div class="row">
                  <div class="input-field">
                    <input id="cantidadInicial" type="number" min=1 class="validate">
                    <label for="cantidadInicial">Rango 1</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field">
                    <input id="cantidadFinal" type="number" min=1 class="validate">
                    <label for="cantidadFinal">Rango 2</label>
                  </div>
               </div>
              </div>
              <div class="col s12 m6 l6">
                <div class="row">
                  <input type="text" placeholder="Fecha" class="datepicker" id="filtroFechaVenta">
                </div>
                <div class="row">
                   <a id="filtrarVentas" class="waves-effect waves-light btn">Filtrar</a>                   
                   <a id="descargarVentas" class="waves-effect waves-light btn"><i class="material-icons">file_download</i> Descargar</a>
                </div>
              </div>
          </div>
          ${table}
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template