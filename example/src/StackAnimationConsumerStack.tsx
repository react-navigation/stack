import * as React from 'react';
import { Button, View } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  createStackNavigator,
  NavigationStackScreenProps,
  StackAnimationProgressContext,
  StackAnimationIsSwipingContext,
} from 'react-navigation-stack';

const ListScreen = (props: NavigationStackScreenProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button
      title="Push to another screen"
      onPress={() => props.navigation.push('Another')}
    />
    <Button
      title="Push to yet another screen"
      onPress={() => props.navigation.push('YetAnother')}
    />
    <Button
      title="Go back to all examples"
      onPress={() => props.navigation.navigate('Home')}
    />
  </View>
);

const AnotherScreen = () => (
  <StackAnimationProgressContext.Consumer>
    {progress => {
      const fontSize = Animated.interpolate(progress.current, {
        inputRange: [0, 1],
        outputRange: [8, 32],
      });

      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'honeydew',
          }}
        >
          <Animated.Text style={{ fontSize, opacity: progress.current }}>
            Animates on progress
          </Animated.Text>
        </View>
      );
    }}
  </StackAnimationProgressContext.Consumer>
);

const YetAnotherScreen = () => (
  <StackAnimationIsSwipingContext.Consumer>
    {isSwiping => {
      const opacity = Animated.interpolate(isSwiping, {
        inputRange: [0, 1],
        outputRange: [1, 0],
      });

      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'cornflowerblue',
          }}
        >
          <Animated.Text style={{ fontSize: 24, opacity }}>
            Disappears on swipe
          </Animated.Text>
        </View>
      );
    }}
  </StackAnimationIsSwipingContext.Consumer>
);

export default createStackNavigator(
  {
    List: ListScreen,
    Another: AnotherScreen,
    YetAnother: YetAnotherScreen,
  },
  { initialRouteName: 'List' }
);
