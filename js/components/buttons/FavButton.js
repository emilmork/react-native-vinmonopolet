var React = require('react-native');
var { Component, TouchableOpacity, AsyncStorage } = React;
var { Icon } = require('react-native-icons');
var db = require('../../data/Db');
var Actions = require('../../data/Actions');

class FavButton extends Component {
    constructor(props) {
        super(props);

        this.state = {favourite : false};
    }

    componentDidMount() {
        db.get(this.props.product.sku.toString()).then((val) => {
          this.setState({favourite: (val !== null)});
        });    
    }

    render() {
       return <TouchableOpacity style={[this.props.style,{marginRight: 10}]} onPress={() => this.favouriteProduct()}>
                  { this.icon() }
            </TouchableOpacity>
    }

    icon(isFav) {
        return this.state.favourite ? <Icon
                    name='ion|ios-heart'
                    size={35}
                    color='#E57373'
                    style={{height:35, width: 35}}
                  />
                  :
                <Icon
                    name='ion|ios-heart-outline'
                    size={35}
                    color='#E57373'
                    style={{height:35, width: 35}}
                  />

    }

    favouriteProduct() {
         if(!this.state.favourite) {
           db.save(this.props.product.sku.toString(), this.props.product)
            .then(() => {
              this.setState({favourite: true});
              Actions.updateFavourites();
            });
         } else {
           db.delete(this.props.product.sku.toString())
             .then(() => { 
                this.setState({favourite: false});
                Actions.updateFavourites();
            });
         }
    }
}

module.exports = FavButton; 