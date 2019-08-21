import * as React from 'react';
import { Button, View, Dimensions } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

class Modal extends React.Component {
  static navigationOptions = {
    title: 'Modal from top',
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          paddingHorizontal: 20,
          height: 300,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      />
    );
  }
}

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => this.props.navigation.push('Modal')}
          title="Push modal from top"
        />
      </View>
    );
  }
}

const gestureResponseDistance = {
  vertical: Dimensions.get('window').height,
};

const App = createStackNavigator(
  {
    Home: { screen: Home },
    Modal: { screen: Modal },
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forVerticalInvertedIOS,
      gestureDirection: 'vertical-inverted',
      gestureEnabled: true,
      cardTransparent: true,
      gestureResponseDistance,
    },
  }
);

export default App;
