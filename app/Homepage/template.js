import ArticleCard from '../ArticleCard'

const template = content => {
  let items = ''

  content.map(item => {
    items += ArticleCard(item)
  })

  let html = `
      <div class="col s12 m10">
        <div class="card-panel">
          <div class="row">
            ${items}
          </div>
        </div>
      </div>
    `

  return html
}

export default template
