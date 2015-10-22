var React = require('react-native');
var { View, Text,TextInput,StyleSheet, Component} = React;
var ProductsList = require('./ProductsList');
var Actions = require('../data/Actions');


var timer;
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { text: ''};
    Actions.fire('searching', true);

  }
  render() {
    return (
      <View style={{flex: 1}}>
          <TextInput onChangeText={(value) => this.search(value)} style={styles.input} placeholder="Søk Vinmonopolet" autoFocus={true} />
          <View style={styles.separator}/>
          <ProductsList searching={true} automaticallyAdjustContentInsets={false} {...this.props} />
      </View>
    )
  }

  search(word) {
    let delay = (1200 - ((word.length) * 50));

    if(!word || word == '') return;
    if(timer) clearTimeout(timer);
    Actions.fire('searching');
    
    timer = setTimeout(() => {
        Actions.getProducts(word, 1);
    }, (delay > 50) ? delay : 50);
  }
}

var styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginTop: 60
  },
  icon: {
    width: 21,
    height: 21,
    marginTop: 4,
    marginRight: 15
  },
  input: {
    marginTop: 70,
    width: 400,
    paddingLeft: 50,
    height: 48,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
  },
  separator: {
    height: 1,
    width: 350,
    alignSelf: 'center',
    backgroundColor: '#cacaca',
    margin: 2
  }
});

module.exports = Search;