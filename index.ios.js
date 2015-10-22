var React = require('react-native');
var { StyleSheet, Component, NavigatorIOS, View } = React;
var Categories = require('./js/components/CategoryList');
var Favourites = require('./js/components/Favourites');
var Search = require('./js/components/Search');
var State = require('react-miniflow').State;
var Types = require('react-miniflow').Types;


State.init({products: Types.List, categories: Types.List,favourites: Types.List, details: {}});

var { TabBarIOS } = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var Example = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
    };
  },
  render: function () {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarItemIOS
          name="home"
          iconName={'ion|ios-home-outline'}
          selectedIconName={'ion|ios-home'}
          title={''}
          iconSize={32}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
           <NavigatorIOS
              style={{flex: 1}}
              itemWrapperStyle={{flex: 1}}
              initialRoute={{
                component: Categories,
                title: 'Vinmonopolet'
              }}
            />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="Search"
            iconName={'ion|ios-search'}
            selectedIconName={'ion|ios-search'}
            title={''}
            iconSize={32}
            accessibilityLabel="search"
            selected={this.state.selectedTab === 'search'}
            onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          <NavigatorIOS
            style={{flex: 1}}
            itemWrapperStyle={{flex: 1}}
            initialRoute={{
              component: Search,
              title: 'Søk'
            }}
          />
        </TabBarItemIOS>
        <TabBarItemIOS
            name="favourites"
            iconName={'ion|ios-star-outline'}
            title={''}
            iconSize={32}
            accessibilityLabel="Favourites Tab"
            selected={this.state.selectedTab === 'favourites'}
            onPress={() => {
            this.setState({
              selectedTab: 'favourites',
            });
          }}>
          <NavigatorIOS
              style={{flex: 1}}
              itemWrapperStyle={{flex: 1}}
              initialRoute={{
                component: Favourites,
                title: 'Favoritter'
              }}
            />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
});

React.AppRegistry.registerComponent('Vinmonopolet', () => Example);




