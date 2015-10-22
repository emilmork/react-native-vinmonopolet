var React = require('react-native');
var { View, Text, Component, StyleSheet, TouchableHighlight } = React;
var Immutable = require('immutable');
var { Icon } = require('react-native-icons');
var Loading = require('./Loading');
var Actions = require('../data/Actions');
var FavButton = require('./buttons/FavButton');
var translations = require('../utils/productTranslations');
var ReactFlow = require('react-miniflow');
var { Store, Enhance } = ReactFlow;

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        
        Actions.getProductDetails(this.props.product.sku)

    }

    render() {
        return this.isLoading() ? <Loading style={{left: 170}}/>
                :
                <View style={styles.product_container}>
                    <FavButton style={{alignSelf: 'flex-end'}} product={this.props.product}/>
                    { this.props.details.value.entrySeq().map(detail => <Detail key={detail[0]} detail={detail}/>) }
                </View>
    }

    isLoading() {
        return (this.props.details == null || !this.props.details.value.size);
    }

}

class Detail extends Component {
    render() {
        let [key, value] = this.props.detail;
        if(!translations[key]) return null;

        let text = translations[key].getVal ? translations[key].getVal(value) : value;

        if(text == "") return null;

        return <View style={styles.details_row}>
            <Text style={styles.detail_name}> { translations[key].name } </Text>
            <Text style={styles.detail_value}> { text } </Text>
        </View>
    }

    linkToWeb() {
        return this.props.detail.url ? <Text>Url</Text> : null;
    }

}

var styles = StyleSheet.create({
    details_row: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca'
    },
    detail_name: {
        width: 110, 
        fontWeight: 'bold', 
        fontSize: 15
    },
    detail_value: {
        flex: 1
    },
    product_container: {
        padding: 5,
        marginTop: 70
    }
});

module.exports = Enhance(ProductDetail, [{event: 'details'}]);