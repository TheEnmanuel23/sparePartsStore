const template = (data = []) => {
	let items = ''
  let keys = Object.keys(data)
	keys.map(key => {
		items += `<li class="collection-item marca-item"><a href="/marcas/${key}">${data[key].descripcion}</a></li>`
	})

	let html = `
     <ul class="collection"">
      <li class="center active list-marcas"><h5>Lista de marcas</h5></li>
      ${items}
    </ul>
    `

  return html
}

export default template