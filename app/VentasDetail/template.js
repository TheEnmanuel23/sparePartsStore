import articulosTemplate from './articulosTemplate'

const template = (factura) => {
	let html = `
 <div class="row">
    <div class="col s12">
	    <div class="card">
	      <div class="card-stacked">
	        <div class="card-content">
	        	<span class="card-title"><i class="material-icons">shopping_basket</i> Detalle de factura</span>
	        	<hr/>
	        	<div class="row">
	        		<div class="col s12 m4 l4">
	        			<div class="row">
	        			  <strong>Número de factura:</strong>
	          			<span>${factura.id}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Fecha:</strong>
	          			<span>${factura.fecha}</span>
	        			</div>
	        		</div>
	        		<div class="col s12 m4 l4">	        		
	        			<div class="row">
	        			  <strong>Total:</strong>
	          			<span>${factura.total}$</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Cantidad de artículos:</strong>
	          			<span>${factura.articulos.length}</span>
	        			</div>
	        		</div>	        		
		        	<div class="col s12 m4 l4">	        		
	        			<div class="row">
	        			  <strong>Cliente:</strong>
	          			<span>${factura.usuario.displayName}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Correo:</strong>
	          			<span>${factura.usuario.email}</span>
	        			</div>
	        		</div>
	        	</div>
	        	${articulosTemplate(factura.articulos)}
	        </div>
	      </div>
	    </div>
    </div>
  </div>`

	return html
}

export default template