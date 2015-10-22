var React = require('react-native');
var { StyleSheet, Component, View, Text, Navigator } = React;
var Categories = require('./js/components/CategoryList.android');
var Router = require('gb-native-router');
var NavigationBar = require('react-native-navbar');
var NavbarScene = require('./js/utils/renderNavbarScene');

class App extends Component {
   render() {
    return (
      <Navigator
        renderScene={NavbarScene}
        initialRoute={{
          component: Categories,
          navigationBar: <NavigationBar title="Vinmonopolet"/>
        }}
      />
    );
  }
}

React.AppRegistry.registerComponent('RNTest', () => App);




