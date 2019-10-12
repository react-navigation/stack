import {
  StackRouter,
  createNavigator,
  createKeyboardAwareNavigator,
  CreateNavigatorConfig,
  NavigationStackRouterConfig,
  NavigationRouteConfigMap,
  NavigationRoute,
} from 'react-navigation';
import { Platform } from 'react-native';
import StackView from '../views/StackView/StackView';
import {
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
} from '../types';

function createStackNavigator(
  routeConfigMap: NavigationRouteConfigMap<
    NavigationStackOptions,
    NavigationStackProp<NavigationRoute, any>
  >,
  stackConfig: CreateNavigatorConfig<
    NavigationStackConfig,
    NavigationStackRouterConfig,
    NavigationStackOptions,
    NavigationStackProp<NavigationRoute, any>
  > = {}
) {
  const router = StackRouter(routeConfigMap, stackConfig);

  // Create a navigator with StackView as the view
  // TODO: don't have time to fix it right now
  // @ts-ignore
  let Navigator = createNavigator(StackView, router, stackConfig);

  if (!stackConfig.disableKeyboardHandling && Platform.OS !== 'web') {
    Navigator = createKeyboardAwareNavigator(Navigator, stackConfig);
  }

  return Navigator;
}

export default createStackNavigator;
