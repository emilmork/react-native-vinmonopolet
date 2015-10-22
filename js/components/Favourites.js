var React = require('react-native');
var styles = require('../styles/styles');
var ProductDetails = require('./ProductDetails');
var ReactFlow = require('react-miniflow');
var { Store, Enhance } = ReactFlow;
var Actions = require('../data/Actions');
var { Text, View, Component, ListView, TouchableOpacity,AsyncStorage } = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
    return r1.sku !== r2.sku
    }
});

class Favourites extends Component {
    constructor() {
      super();

      this.state = { favProducts: [] }

      Actions.updateFavourites();  
    }

    updateFavourites() {
      db.getAll().then((favourites) => {
        this.setState({favProducts: favourites});    
      });
    }

    render () {
        var favourites = this.props.favourites;
        if(favourites == null) return null;

        return  <ListView
                  { ...this.props }
                  dataSource={ds.cloneWithRows(favourites.value.toJS())}
                  renderRow={(product) => <ProductListItem {...this.props} product={product} />}
                />
    }
}

class ProductListItem extends Component {

    render() {
        let product = this.props.product;

        return <TouchableOpacity style={styles.product_list_item} onPress={() => this.showDetails()}>
                    <View>
                      <Text style={styles.product_list_title}> { product.title } </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1}}> Kr. { product.price } ,- </Text>
                        <Text> ( {product.containerSize}l)</Text>
                      </View>
                    </View>
                </TouchableOpacity>
    }

    showDetails() {
       this.props.navigator.push({
          title: this.props.product.title,
          component: ProductDetails,
          passProps: {
            product: this.props.product
          }
        });
    }
}

module.exports = Enhance(Favourites,['favourites']);