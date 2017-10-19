import ArticleCard from '../ArticleCard'

const template = (modelos, articulos) => {
  let items = ''
  modelos.map(mod => {
    articulos.find(art => {
      if (art.idModelo == mod.id) {
        items += `
          <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>${mod.nombre}</div>
            <div class="collapsible-body">
              <div class="row">
                ${ArticleCard(art)}
              </div>
            <span>
            </span></div>
          </li>`
      }
    })        
  })

  let html = `
  <ul class="collapsible" data-collapsible="accordion">
    ${items}
  </ul>`

  return html
}

export default template