const template = () => {
	let html = `

  <div class="row">
  	<h4>Contáctanos</h4>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Nombre</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Apellido</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate">
          <label for="email">Correo electrónico</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="subject" type="text" class="validate">
          <label for="subject">Asunto</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="comments" class="materialize-textarea" data-length="120"></textarea>
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