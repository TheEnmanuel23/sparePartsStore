import ArticleCard from '../ArticleCard'

const template = (modelos, articulos) => {
  let items = ''
  if (!modelos || !articulos) return 
    
  modelos.map(mod => {
    let articulosPorModelo = articulos.filter((item) => item.idModelo == mod.id)

    let articulosHTML = ''
    articulosPorModelo.map(item => articulosHTML += ArticleCard(item, 6, 28))

    let modelTemplate = `<li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>${mod.nombre}</div>
            <div class="collapsible-body">
              <div class="row">
                ${articulosHTML}
              </div>
            <span>
            </span></div>
          </li>`

    items += modelTemplate
  })

  let html = `
  <ul class="collapsible" data-collapsible="accordion">
    ${items}
  </ul>`

  return html
}

export default template