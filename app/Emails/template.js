const template = (emails) => {
  let rows = ''
  let countRow = 1
	emails.map(item => {
    rows +=  `
     <tr id=${item.id}>
      <td>${countRow++}</td>
      <td>${item.subject}</td>
      <td><a href="/emails/${item.id}">${item.name}</a></td>
      <td>${item.date}</td>
    </tr>
    `
  })

  let table = `
  <table class="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Asunto</th>
        <th>Nombre</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody id="bodyEmails">
      ${rows}
    </tbody>
  </table>`

  let card = `
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title"><i class="material-icons">email</i> Bandeja de entrada</span>
          <div class="row">
            <div class="col s12 m4 l4">
              <select id="optionsAsuntosFilter">
                <option value="" disabled selected>Cambiar de opción</option>
              </select>
            </div>
            <div class="col s12 m4 l4">
              <input type="text" placeholder="Fecha" class="datepicker" id="filtroFechaCorreo">
            </div>
            <div class="col s12 m4 l4">
              <a id="filtrarCorreos" class="waves-effect waves-light btn">Filtrar</a>
            </div>
          </div>
          ${table}
        </div>
      </div>
    </div>
  </div>`

  return card
}

export default template