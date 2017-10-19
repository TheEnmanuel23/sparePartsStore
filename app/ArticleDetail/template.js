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
            : null
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
        <img clas="center" src="http://pngimg.com/uploads/samsung_logo/samsung_logo_PNG9.png">
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
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
`
}

export default template