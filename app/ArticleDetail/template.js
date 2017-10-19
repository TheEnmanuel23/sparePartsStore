const inventarioCard = inventario => {
  return `
     <div class="row">
      <div class="col s12 m5">
        <div class="card-panel">
          <div><span>Precio: ${inventario.precio_venta}$</span></div>
          <div><span>En stock: ${inventario.stock}</span></div>
          </br>
          ${
            inventario.nuevo ? `
              <div class="chip">Nuevo</div>`
            : null
          }
          
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
          ${inventarioCard(article.inventario)}
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
`
}

export default template