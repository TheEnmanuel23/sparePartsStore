const template = (email) => {
	let html = `
 <div class="row">
    <div class="col s12">
	    <div class="card">
	      <div class="card-stacked">
	        <div class="card-content">
	        	<span class="card-title"><i class="material-icons">email</i> Bandeja de entrada</span>
	        	<hr/>
	        	<div class="row">
	        		<div class="col s12 m6 l6">
	        			<div class="row">
	        			  <strong>Nombre:</strong>
	          			<span>${email.name}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Asunto:</strong>
	          			<span>${email.subject}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Correo:</strong>
	          			<span>${email.email}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Fecha:</strong>
	          			<span>${email.date}</span>
	        			</div>
	        		</div>
	        		<div class="col s12 m6 l6">
	        			<div class="row">
	        			  <strong>Artículo:</strong>
	          			<span>${email.articulo}</span>
	        			</div>
	        			<div class="row">
	        			  <strong>Comentario:</strong>
	          			<span>${email.comments}</span>
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