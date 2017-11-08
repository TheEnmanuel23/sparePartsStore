const template = () => {
	let html = `
  <div class="col m10 offset-m1 s12">
    <h4 class="center-align">Contáctanos</h4>
    <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input name="name" id="name" type="text" class="validate">
              <label for="name">Nombre</label>
            </div>
             <div class="input-field col s6">
              <input name="email" id="email" type="email" class="validate">
              <label for="email">Correo electrónico</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="subject" id="subject" type="text" class="validate">
              <label for="subject">Asunto</label>
            </div>
            <div class="input-field col s6">
              <textarea name="comments" id="comments" class="materialize-textarea" data-length="120"></textarea>
              <label for="comments">Comentarios</label>
            </div>
          </div>
          <a id="enviarContacto" class="waves-effect waves-light btn">Enviar</a>
        </form>
    </div>
  </div>
        `
  return html
}

export default template