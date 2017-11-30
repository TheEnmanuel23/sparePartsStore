import terminos from './terminos'

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
      <td>${item.descripcion}</td>
      <td>${item.inventario.precio_venta}$</td>
      <td>${item.cantidad}</td>
      <td>${totalRow}$</td>
      <td><a id="del-${item.id}" class="waves-effect waves-light red btn">Eliminar</a></td>
    </tr>
    `
    total += totalRow
  })

  let table = `
  <table class="striped">
    <thead>
      <tr>
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
          <a id="listoCar" class="waves-effect green darken-2 btn"><i class="material-icons right">shopping_cart</i>Listo</a>
          <a id="vaciar-carrito" class="waves-effect red btn"><i class="material-icons right">remove_shopping_cart</i>Vaciar</a>          
          <div class="chip right">
            Total: <span id="totalCompra">${total}</span>$
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal para comprar -->
  <div id="modalComprar" class="modal">
    <div class="modal-content">
      <h4>Realizando compra ...</h4>
      <div class="row">
        <p>
          <input id="terminos" type="checkbox" class="filled-in" />
          <label for="terminos">Acepto los términos y condiciones</label>
          <a class="waves-effect waves-light modal-trigger" href="#modal1">, Leer</a>
        </p>
         
      </div>
    </div>
    <div class="modal-footer">
      <a id="comprar" class="waves-effect green darken-2 btn"><i class="material-icons right">shopping_cart</i>Comprar</a>
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
  </div>

  <!-- Modal para terminos y condiciones -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Términos y condiciones</h4>
      <p>
        ${terminos}
      </p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
  </div>
  `

  return card
}

export default template