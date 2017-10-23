const inventarioCard = inventario => {
  return `
      <div class="col s12 m6">
        <div class="card-panel">
          <div><span>Precio: ${inventario.precio_venta}$</span></div>
          <div><span>En stock: ${inventario.stock}</span></div>
          </br>
          ${
            inventario.nuevo ? `
              <div class="chip">Nuevo</div>`
            : ''
          }          
        </div>
      </div>
`
}

const modeloCard = modelo => {
  return `
  <div class="col s12 m6">
    <div class="card">
      <div class="card-image image-marca">
        <img clas="center" src=${modelo.marca.img}>
      </div>
      <div class="card-content detail-marca">
        <p>Marca: ${modelo.marca.descripcion}</p>
       <p>Modelo: ${modelo.nombre}</p>
      </div>
    </div>
  </div>
`
}

const template = article => {
	return `
   <div class="col">
    <h2 class="header">${article.descripcion}</h2>
    <div class="card horizontal">
      <div class="card-image">
        <img src=${article.img}>
      </div>
      <div class="card-stacked">
        <div class="card-content">
        	<span class="card-title">Detalle</span>
          <p>${article.detalle}</p>
          </br>
          <div class="row">
            ${inventarioCard(article.inventario)}
            ${modeloCard(article.modelo)}
          </div>
        </div>
        <div class="card-action">
          <div class="row">
            <div class="col s12 m6">
              <p><strong>Cantidad:</strong></p>
              <p class="range-field">
                <input type="range" id="cantArticle" min="1" max=${article.inventario.stock} />
              </p>
            </div>
            <div class="col s12 m6">
              <a id="addToCard" class="waves-effect btn"><i class="material-icons right">add_shopping_cart</i>Agregar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
}

export default template