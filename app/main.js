import page from 'page'

import './Header'
import './Footer'
import loadMarcas from './Marcas'
loadMarcas()
import './Homepage'
import './Modelos'
import './ArticleDetail'
import './ShoppingCar'
import Car from './ShoppingCar/Car'
import './SearchArticle'
import './Accesorios'
import './Top'
import './main.css'

document.Car = new Car()

page()