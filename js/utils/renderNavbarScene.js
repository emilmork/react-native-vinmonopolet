var React = require('react-native');
var { Navigator, View } = React;

module.exports = (route, navigator) => {
    var Component = route.component;
    var navBar = route.navigationBar;
 
    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route
      });
    }
 
    return (
      <View style={{flex: 1}}>
        {navBar}
        <Component {...route.passProps} navigator={navigator} route={route} />
      </View>
    );
  }