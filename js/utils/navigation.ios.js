
module.exports.productsSchene = (title) => {
  return {
          name: "Products",
          component: ProductList,
          navigationBar: <NavigationBar title={title}/>, 
          passProps: {
            category: title
          }
        }
};