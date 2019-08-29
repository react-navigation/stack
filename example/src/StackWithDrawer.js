import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useTheme, ThemeColors } from '@react-navigation/core';
import { Themed } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// eslint-disable-next-line import/default
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

const tabBarIcon = name => ({ tintColor, horizontal }) => (
  <MaterialIcons name={name} color={tintColor} size={horizontal ? 17 : 24} />
);

function Menu({ navigation }) {
  let theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors[theme].bodyContent }}>
      <Button title="Open on top" onPress={() => navigation.navigate('Top')} />
    </View>
  );
}

class Fake extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Themed.Text style={{ fontSize: 20 }}>
          {this.props.navigation.getParam('title')}
        </Themed.Text>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator(
  {
    Article: {
      screen: Fake,
      navigationOptions: {
        tabBarIcon: tabBarIcon('chrome-reader-mode'),
      },
      params: { title: 'Article' },
    },
    Chat: {
      screen: Fake,
      navigationOptions: {
        tabBarIcon: tabBarIcon('chat-bubble'),
      },
      params: { title: 'Chat' },
    },
    Contacts: {
      screen: Fake,
      navigationOptions: {
        tabBarIcon: tabBarIcon('contacts'),
      },
      params: { title: 'Contacts' },
    },
  },
  {
    defaultNavigationOptions: {
      tabBarButtonComponent: TouchableBounce,
    },
  }
);

const Drawer = createDrawerNavigator(
  {
    TabScreen: {
      screen: Tab,
    },
  },
  {
    contentComponent: props => <Menu {...props} />,
    navigationOptions: { title: 'Example' },
  }
);

const App = createStackNavigator({
  Drawer: { screen: Drawer },
  Top: { screen: Fake, params: { title: 'Top' } },
});

export default App;
