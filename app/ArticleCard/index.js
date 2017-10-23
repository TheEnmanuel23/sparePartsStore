let card = article => {
	return `      
		<div class="col s12 m2 l3">
		  <div class="card">
		    <div class="card-image">
		      <img class="activator" src=${article.img}>     
		    </div>
		    <div class="card-content">
		      <span class="card-title activator grey-text text-darken-4">${splitDescription(article.descripcion)}<i class="material-icons right">more_vert</i></span>
		      ${
		        article.nuevo ? `
		          <div class="chip">Nuevo</div>`
		        : ''
		      }
		      <span class="right">${article.precio}$</span>
		    </div>
		    <div class="card-action">
		    	<div class="row">
		    		<div  class="col s12 m10 l10" >
			      	<a href="/article/${article.id}">Detalle</a>
			      </div>
			      <div class="col s12 m2 l2" >
			      	<a style="cursor: pointer;"><i id=btnAddSingleToCard${article.id} class="material-icons">add_shopping_cart</i></a>
			      </div>
			    </div>
		    </div>  
		    <div class="card-reveal">
		      <span class="card-title grey-text text-darken-4">${article.descripcion}<i class="material-icons right">close</i></span>
		      <p>${article.detalle}</p>
		      <p><strong>Tipo:</strong> ${article.tipo.descripcion}</p>
		    </div>
		  </div>
		</div>`


}

function splitDescription (descripcion) {
  let newdescripcion = descripcion

  if (descripcion.length > 23) {
    newdescripcion = descripcion.substr(0, 23) + ' ...'
  }

  return newdescripcion
}

export default card