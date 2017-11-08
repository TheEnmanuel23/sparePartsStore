const template = () => {
	let html = `

  <div class="row">
  	<h4>Contáctanos</h4>
    <form id="contactoForm"  class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input name="name" id="name" type="text" class="validate">
          <label for="name">Nombre</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input name="email" id="email" type="email" class="validate">
          <label for="email">Correo electrónico</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input name="subject" id="subject" type="text" class="validate">
          <label for="subject">Asunto</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea name="comments" id="comments" class="materialize-textarea" data-length="120"></textarea>
          <label for="comments">Comentarios</label>
        </div>
      </div>
      <a id="enviarContacto" class="waves-effect waves-light btn">Enviar</a>
    </form>
  </div>
        `
  return html
}

export default template