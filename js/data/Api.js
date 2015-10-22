var Immutable = require('immutable');

const BASE_URL = 'http://localhost:4000/api/';

let Cache = Immutable.Map();

var getData = (url) => new Promise((resolve, reject) => {
    if(Cache.has(url)) resolve(Cache.get(url));

    fetch(url).then(res => res.json()).then((data) => {
        Cache.set(url, data);
        resolve(data);
    }).catch(err => reject(err));
});


module.exports = {
    fetchCategories() {
        return getData(`${BASE_URL}/categories`);
    },

    fetchProducts(category, page) {
        return getData(`${BASE_URL}/categories/${category}/${page}`);
    },

    fetchProduct(id) {
        return getData(`${BASE_URL}/product/${id}`);
    }
}