import terminos from './terminos'
import mastercardyvisa from './mastercardyvisa.jpg'
import cvc2 from './cvc2.jpg'
import paypalButton from './paypalButton.png'

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
      <td><a id="del-${item.id}" class="waves-effect waves-light red btn"><i class="material-icons">remove_shopping_cart</i></a></td>
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
          <div class="row">
            ${table}
          </div>
          <div class="row">
            <hr>
            <p class="right">Total de productos: <strong>${total}$</strong></p>
            <br/>         
            <p class="right">Total envío: <strong>2$</strong></p>
            <br/> 
            <hr>
            <div class="chip right">
              Total de su compra: <span id="totalCompra">${total + 2}</span>$
            </div>
          </div>
        </div>
        <div class="card-action">
          <div class="row">
            <p>
              <input id="terminos" type="checkbox" class="filled-in" />
              <label for="terminos">Acepto los términos y condiciones</label>
              <a class="waves-effect waves-light modal-trigger" href="#modal1">, Leer</a>
            </p>         
          </div>
          <a id="listoCar" class="waves-effect green darken-2 btn"><i class="material-icons right">shopping_cart</i>Listo</a>
          <a id="vaciar-carrito" class="waves-effect red btn"><i class="material-icons right">remove_shopping_cart</i>Vaciar</a>
        </div>
      </div>
    </div>
  </div>

   <!-- Modal para comprar -->
  <div id="modalComprar" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Realizando compra ...</h4>
      <div class="row">
        <p>Tarjetas</p>
        <img id="tarjetas" src=${mastercardyvisa} style="height: 50px;"/>
      </div>
      <hr/>
      <div class="row">
        <div class="input-field col s12">
          <input id="direccionEnvio" type="text" class="validate">
          <label for="direccionEnvio">Dirección de envío</label>
        </div>
      </div>      
      <p>Datos de tarjeta</p>
      <div class="row">
        <div class="row">
          <div class="input-field col s6 m6 l6">
            <input placeholder="Como aparece en la tarjeta" id="nombreTitular" type="text" class="validate">
            <label for="nombreTitular">Nombre del titular</label>
          </div>
          <div class="input-field col s6 m6 l6">
            <input id="numeroTarjeta" type="text" class="validate">
            <label for="numeroTarjeta">Número de tarjeta</label>
          </div>
        </div>
        <div class="row">
          <p>Fecha de expiración</p>
          <div class="row">
            <div class="col s6 m6 l6">
              <div class="row">
                <div class="input-field  col s6 m6 l6">
                  <select id="optionsMesExpiracionCar">
                  </select>
                </div>
                <div class="input-field col s6 m6 l6">                  
                  <input id="anioExpiracion" type="number" class="validate">
                  <label for="anioExpiracion">Año</label>
                </div>
              </div>
            </div>
            <div class="col s6 m6 l6">
              <div class="row">
                <div class="input-field col s8 m8 l8">
                  <input id="codigoSeguridad" placeholder="3 dígitos" type="number" class="validate">
                  <label for="codigoSeguridad">Código de seguridad</label>
                </div>
                <div class="col s4 m4 l4">
                  <img  class="materialboxed" data-caption="Dígitos de seguridad" src=${cvc2} style="height: 50px;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a class="btn-flat" href="https://www.paypal.com/ni/webapps/mpp/home?gclid=EAIaIQobChMInreamq7n1wIVERuBCh0PUQl4EAAYASAAEgJhfvD_BwE&dclid=CLCYs5uu59cCFZJThgodhlEArw" >
        <img style="width: 180px;" src=${paypalButton}/>
      </a>
      <a id="comprar" class="waves-effect green darken-2 btn"><i class="material-icons right">shopping_cart</i>Comprar ahora</a>
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
    </div>
  </div>

  <!-- Modal para terminos y condiciones -->
  <div id="modal1" class="modal modal-fixed-footer">
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