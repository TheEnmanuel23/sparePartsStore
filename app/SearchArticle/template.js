import ArticleCard from '../ArticleCard'

const template = content => {
  let items = ''

  content.map(item => {
    items += ArticleCard(item)
  })

  let html = `
    <div class="row">
      ${items}
    </div>
    `

  return html
}

export default template
