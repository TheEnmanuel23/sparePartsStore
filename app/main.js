import page from 'page'

import './Header'
import loadMarcas from './Marcas'
loadMarcas()
import './Homepage'
import './Modelos'
import './ArticleDetail'
import './ShoppingCar'
import Car from './ShoppingCar/Car'
import './main.css'

document.Car = new Car()
page()