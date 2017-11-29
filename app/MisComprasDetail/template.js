const template = (factura) => {
	let html = `
 <div class="row">
    <div class="col s12">
	    <div class="card">
	      <div class="card-stacked">
	        <div class="card-content">
	        	<span class="card-title"><i class="material-icons">shopping_basket</i> Mis compras</span>
	        	<hr/>
	        	<div class="row">
	        		<div class="col s12 m6 l6">
	        			<div class="row">
	        			  <strong>Número de factura:</strong>
	          			<span>${factura.id}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Fecha:</strong>
	          			<span>${factura.fecha}</span>
	        			</div>
	        		</div>
	        		<div class="col s12 m6 l6">	        		
	        			<div class="row">
	        			  <strong>Total:</strong>
	          			<span>${factura.total}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Cantidad de artículos:</strong>
	          			<span>${factura.articulos.length}</span>
	        			</div>
	        		</div>
	        	</div>
	        </div>
	      </div>
	    </div>
    </div>
  </div>`

	return html
}

export default template