import * as React from 'react';
import { StackRouter, createNavigator } from '@react-navigation/core';
import { Platform } from 'react-native';
import StackView from '../views/Stack/StackView';
import {
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationProp,
  Screen,
} from '../types';
import KeyboardManager from '../views/KeyboardManager';

function createStackNavigator(
  routeConfigMap: {
    [key: string]:
      | Screen
      | ({ screen: Screen } | { getScreen(): Screen }) & {
          path?: string;
          navigationOptions?:
            | NavigationStackOptions
            | ((options: {
                navigation: NavigationProp;
              }) => NavigationStackOptions);
        };
  },
  stackConfig: NavigationStackConfig = {}
) {
  const router = StackRouter(routeConfigMap, stackConfig);

  if (stackConfig.keyboardHandling === 'disabled' || Platform.OS === 'web') {
    return createNavigator(StackView, router, stackConfig);
  }

  return createNavigator(
    navigatorProps => (
      <KeyboardManager
        stickyKeyboard={stackConfig.keyboardHandling === 'sticky'}
      >
        {props => <StackView {...props} {...navigatorProps} />}
      </KeyboardManager>
    ),
    router,
    stackConfig
  );
}

export default createStackNavigator;
