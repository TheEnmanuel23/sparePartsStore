class Car {
	constructor () {
		this.articles = []
	}

	addToCar (article) {
		this.articles.push(article)
	}

	removeOfCar (article) {
		this.articles = this.articles.filter(item => item.id != article.id)
	}
}

export default Car