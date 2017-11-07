import page from 'page'
import template from './template'

page('/contacto', () => {
  let content = document.querySelector('#content')

  let html = template()
  content.innerHTML = html
})
