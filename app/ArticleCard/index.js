let card = article => {
	return `      
		<div class="col s12 m2 l4">
		  <div class="card">
		    <div class="card-image">
		      <img class="activator" src=${article.img}>     
		    </div>
		    <div class="card-content">
		      <span class="card-title activator grey-text text-darken-4">${article.descripcion}<i class="material-icons right">more_vert</i></span>
		      ${
		        article.nuevo ? `
		          <div class="chip">Nuevo</div>`
		        : null
		      }
		      <span class="right">${article.precio}$</span>
		    </div>
		    <div class="card-action">
		      <a href="#">Ver Detalle</a>
		    </div>  
		    <div class="card-reveal">
		      <span class="card-title grey-text text-darken-4">${article.descripcion}<i class="material-icons right">close</i></span>
		      <p>${article.detalle}</p>
		    </div>
		  </div>
		</div>`
}	
export default card