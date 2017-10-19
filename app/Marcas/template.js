const template = data => {
	let items = ''

	data.map(item => {
		items += `<li><a href="/marcas/${item.id}">${item.descripcion}</a></li>`
	})

	let html = `
  <ul id="staggered-list" class="side-nav fixed text-lighten-4 go" style="width:230px;margin-top:65px;">
  	<li class="center active list-marcas"><h5>Lista de marcas</h5></li>
    <br />
    ${items}
  </ul>
    `

  return html
}

export default template