var Api = require('./Api');
var Store = require('react-miniflow').State;
var Immutable = require('immutable');
var db = require('./Db');

module.exports = {
    getCategories: () => {
        Api.fetchCategories()
            .then((categories) => {
              Store.update('categories', {}, Immutable.List(categories)); 
            }).catch((err) => {
                console.log(err);
            })
    },
    getProducts: (category, page) => {
        Api.fetchProducts(category, page)
          .then((products) => Store.update('products', category, Immutable.List(products), (page > 1)))
          .catch(err => console.log(`Could not fetch products for ${category}`, err));
    },
    getProductDetails: (productId) => {
        Api.fetchProduct(productId)
            .then((details) => Store.update('details', productId, Immutable.Map(details)));
    },
    fire: (word) => {
        Store.fire(word);
    },
    updateFavourites: () => {
      db.getAll().then((favourites) => {
        Store.set('favourites', Immutable.List(favourites));    
      });
    }
}
