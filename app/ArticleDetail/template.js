const template = article => {
	return `
   <div class="col">
    <h2 class="header">${article.descripcion}</h2>
    <div class="card horizontal">
      <div class="card-image">
        <img src=${article.img}>
      </div>
      <div class="card-stacked">
        <div class="card-content">
        	<span class="card-title">${article.descripcion}</span>
          <p>${article.detalle}</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
`
}

export default template