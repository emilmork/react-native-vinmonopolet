var React = require('react-native');
var { Component, Image, Text, View, TouchableOpacity } = React;
var Immutable = require('immutable');
var ProductList = require('./ProductsList');
var styles = require('../styles/styles');
var Actions = require('../data/Actions');
var provideWith = require('react-miniflow').Enhance;
var NavigationBar = require('react-native-navbar');
var CategoryImages = require('../utils/images');


class CategoryList extends Component {
    constructor() {
      super();

      Actions.getCategories();
  }

  render () {
      let categories = this.props.categories;

      return (
          <View style={[styles.categories_container,{marginTop: 0}]}>
              { (categories == null || !categories.value || !categories.value.size) ? <Text>Loading</Text>
                :
                categories.value.map((cat) => <Category key={cat.title} category={cat} {...this.props} />) 
              }
          </View>
          ) 
  }
}


class Category extends Component {
      render() {
        return (
            <TouchableOpacity style={[styles.category_container,{marginTop: 5, marginBottom: 5}]} onPress={() => this.showProducts()}>
              <View>
                  <Text style={styles.category_title}>
                    { this.props.category.title}
                    </Text>
                  <Text style={{alignSelf: 'center'}}>
                    ( { this.props.category.productCount } ) 
                  </Text>
                  <Image
                    style={styles.category_image}
                    source={CategoryImages.forCategory(this.props.category.title)}
                  />
              </View>
            </TouchableOpacity>
            );
      }

      showProducts() {
        this.props.navigator.push({
          name: "Products",
          component: ProductList,
          navigationBar: <NavigationBar title={this.props.category.title}/>, 
          passProps: {
            category: this.props.category.title
          }
        });      
      }
};

module.exports = provideWith(CategoryList, ['categories']);;
