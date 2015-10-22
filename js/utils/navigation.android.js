var NavigationBar = require('react-native-navbar');
var ProductDetails = require('./ProductDetails');


module.exports.productsSchene = (product) => {
  return {
          title: product.title,
          component: ProductDetails,
          rightCorner: FavButton,
          passProps: {
            product: product
          }
        });
};