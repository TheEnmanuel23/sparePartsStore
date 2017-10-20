import ArticleCard from '../ArticleCard'

const template = content => {
  let items = ''

  let arrayData = splitArray(content)

  arrayData.map(itemArr => {
    let rowHTML = ''

    itemArr.map(itemRow => {
       rowHTML += ArticleCard(itemRow)
    })

    let row = ` 
    <div class="row">
      ${rowHTML}
    </div>`

    items += row
  })

  let html = `
    <div class="row">
      ${items}
    </div>
    `
  return html
}

function splitArray (originArrayData) {
  let chunkSize = Math.ceil(originArrayData.length/3)
  let start = 0
  let newArr = []

  for (let i = 0; i < chunkSize; i++) {
    let arrToWork = originArrayData.slice(0)
    newArr.push(arrToWork.splice(start, 3))
    start += 3
  }

  return newArr
}

export default template
