const addEventClickToArticles = (articles) => {
	for (let i = 0; i < articles.length; i++) {
		let article = articles[i]
		console.log(article.id)
		let addSingle = document.querySelector(`#btnAddSingleToCard${article.id}`)
		addSingle.addEventListener('click', (e) => alert(article.id))
	}
}

export default addEventClickToArticles