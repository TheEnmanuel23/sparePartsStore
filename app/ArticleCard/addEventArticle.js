import addShoppingCar from '../ShoppingCar/addShoppingCar'

const addEventClickToArticles = (articles) => {
	for (let i = 0; i < articles.length; i++) {
		let article = articles[i]
		let addSingle = document.querySelector(`#btnAddSingleToCard${article.id}`)
		addSingle.addEventListener('click', () => addShoppingCar(article, 1))
	}
}

export default addEventClickToArticles