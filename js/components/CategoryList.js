var React = require('react-native');
var { Component, Image, Text, View, TouchableOpacity, NavigatorIOS } = React;
var ProductList = require('./ProductsList');
var styles = require('../styles/styles');
var Loading = require('./Loading');
var Actions = require('../data/Actions');
var CategoryImages = require('../utils/images');
var EnhancedComponent = require('react-miniflow').Enhance;

class CategoryList extends Component {
    constructor() {
      super();

      Actions.getCategories();
  }

  render () {
      let categories = this.props.categories;

      return (
          <View style={styles.categories_container}>
              { categories == null ? <Loading style={{left: 0}}/>
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
            <TouchableOpacity style={styles.category_container} onPress={() => this.showProducts()}>
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
            title: this.props.category.title,
            component: ProductList,
            passProps: {
              category: this.props.category.title,
            }
        });
      }


};

module.exports = EnhancedComponent(CategoryList, ['categories']);;
