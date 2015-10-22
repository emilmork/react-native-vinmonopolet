var React = require('react-native');
var {View,Text, Component, ActivityIndicatorIOS} = React;


class Loading extends Component {
    constructor() {
        super();
    }
    render() {
        return <View style={{alignItems: 'center'}}>
                    <ActivityIndicatorIOS
                        animating={true}
                        style={[this.props.style,{position: 'absolute', top: 200}]}
                        size="large"
                      />
            </View>
    }
}
module.exports = Loading;