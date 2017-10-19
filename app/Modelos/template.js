import ArticleCard from '../ArticleCard'

function loadArticulos (content) {
  let items = ''

  content.map(item => {
    items += ArticleCard(item)
  })

  let html = `
   <div class="row">
      ${items}
    </div>`
  
  return html
}

const template = (data, articulos) => {
  let items = ''
  data.map(item => {
    items += `
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>${item.nombre}</div>
      <div class="collapsible-body"><span>${loadArticulos(articulos)}</span></div>
    </li>`
        
  })

  let html = `
  <ul class="collapsible" data-collapsible="accordion">
    ${items}
  </ul>`

  return html
}

export default template