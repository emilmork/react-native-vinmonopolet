var React = require('react-native');
var { Text, View, Component, ListView, TouchableOpacity } = React;
var ProductDetails = require('./ProductDetails');
var Immutable = require('immutable');
var styles = require('../styles/styles');
var Actions = require('../data/Actions');
var Loading = require('./Loading');
var NavigationBar = require('react-native-navbar');
var ReactFlow = require('react-miniflow');
var { State, Enhance } = ReactFlow;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.sku !== r2.sku });


class ProductList extends Component {
    constructor(props) {
        super(props);
        
        if(this.props.category) {
          Actions.getProducts(this.props.category, 1);
        }
    }

    render () {
        var productsData = this.props.products;

        if(productsData == null || productsData.searching) return <Loading style={{left: 170}} />
        if(!productsData.products || productsData.products.size == 0) return <Text style={{flex: 1, textAlign: 'center', fontSize: 20, marginTop: 50}}>Ingen treff</Text>

        return  <ListView
                  { ...this.props }
                  dataSource={ds.cloneWithRows(productsData.products.toJS())}
                  onEndReached={() => Actions.getProducts(productsData.category, productsData.page + 1)}
                  renderRow={(product) => <ProductListItem {...this.props} product={product} />}
                />
    }
};

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
        // Workds on android and ios
        this.props.navigator.push({
          title: this.props.product.title,
          component: ProductDetails,
          navigationBar: <NavigationBar title={this.props.product.title}/>,
          passProps: {
            product: this.props.product
          }
        });
    }
}


module.exports = Enhance(ProductList, [{event:'products', handler: (data) => {
  if(!data || !data.value) return {};
  return {
    page: Math.ceil((data.value.size / 50)),
    products: data.value,
    category: data.id,
    searching: false
  }
}},{event: 'searching'}]);