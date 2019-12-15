import {
  NavigationRoute,
  NavigationParams,
  NavigationScreenConfig,
  SupportedThemes,
} from 'react-navigation';
import { StackNavigationProp, StackNavigationOptions } from './vendor/types';

export type NavigationStackScreenProps<
  Params = NavigationParams,
  ScreenProps = unknown,
  NextParams = NavigationParams
> = {
  theme: SupportedThemes;
  navigation: StackNavigationProp<NavigationRoute, Params, NextParams>;
  screenProps: ScreenProps;
};

export type NavigationStackScreenComponent<
  Params = NavigationParams,
  ScreenProps = unknown
> = React.ComponentType<NavigationStackScreenProps<Params, ScreenProps>> & {
  navigationOptions?: NavigationScreenConfig<
    StackNavigationOptions,
    StackNavigationProp<NavigationRoute, Params>,
    ScreenProps
  >;
};
