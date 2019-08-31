import { StackRouter, createNavigator } from '@react-navigation/core';
import { createKeyboardAwareNavigator } from '@react-navigation/native';
import { Platform } from 'react-native';
import StackView from '../views/StackView/StackView';
import {
  NavigationStackScreenOptions,
  NavigationStackConfig,
  Screen,
} from '../types';

function createStackNavigator(
  routeConfigMap: {
    [key: string]:
      | Screen
      | ({ screen: Screen } | { getScreen(): Screen }) & {
          path?: string;
          navigationOptions?: NavigationStackScreenOptions;
          params?: { [key: string]: any };
        };
  },
  stackConfig: NavigationStackConfig & {
    initialRouteName?: string;
    initialRouteParams?: { [key: string]: any };
    paths?: { [routeName: string]: string };
    defaultNavigationOptions?: NavigationStackScreenOptions;
    navigationOptions?: NavigationStackScreenOptions;
    initialRouteKey?: string;
  } = {}
) {
  const router = StackRouter(routeConfigMap, stackConfig);

  // Create a navigator with StackView as the view
  let Navigator = createNavigator(StackView, router, stackConfig);
  if (!stackConfig.disableKeyboardHandling && Platform.OS !== 'web') {
    Navigator = createKeyboardAwareNavigator(Navigator, stackConfig);
  }

  return Navigator;
}

export default createStackNavigator;
