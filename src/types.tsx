import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  NavigationRoute,
  NavigationDescriptor,
  NavigationAction,
  NavigationState,
  NavigationParams,
  NavigationScreenProp,
  NavigationNavigateAction,
  NavigationEventCallback,
  NavigationEventSubscription,
} from 'react-navigation';

export type Scene = {
  key: string;
  index: number;
  isStale: boolean;
  isActive: boolean;
  route: NavigationRoute;
  descriptor: NavigationDescriptor<NavigationParams, NavigationStackOptions>;
};

export type NavigationStackEventName =
  | 'willFocus'
  | 'didFocus'
  | 'willBlur'
  | 'didBlur';

export type NavigationStackState = NavigationState;

export type NavigationStackProp<
  State = NavigationRoute,
  Params = NavigationParams
> = NavigationScreenProp<State, Params> & {
  push: (
    routeName: string,
    params?: NavigationParams,
    action?: NavigationNavigateAction
  ) => boolean;
  replace: (
    routeName: string,
    params?: NavigationParams,
    action?: NavigationNavigateAction
  ) => boolean;
  reset: (actions: NavigationAction[], index: number) => boolean;
  pop: (n?: number, params?: { immediate?: boolean }) => boolean;
  popToTop: (params?: { immediate?: boolean }) => boolean;
  addListener: (
    event: NavigationStackEventName,
    callback: NavigationEventCallback
  ) => NavigationEventSubscription;
};

export type HeaderMode = 'float' | 'screen' | 'none';

export type HeaderLayoutPreset = 'left' | 'center';

export type HeaderTransitionPreset = 'fade-in-place' | 'uikit';

export type HeaderBackgroundTransitionPreset = 'translate' | 'fade';

export type HeaderProps = {
  mode: HeaderMode;
  position: Animated.Value;
  navigation: NavigationStackProp;
  layout: TransitionerLayout;
  scene: Scene;
  scenes: Scene[];
  layoutPreset: HeaderLayoutPreset;
  transitionPreset?: HeaderTransitionPreset;
  backTitleVisible?: boolean;
  leftInterpolator?: (props: SceneInterpolatorProps) => any;
  titleInterpolator?: (props: SceneInterpolatorProps) => any;
  rightInterpolator?: (props: SceneInterpolatorProps) => any;
  backgroundInterpolator?: (props: SceneInterpolatorProps) => any;
  isLandscape: boolean;
};

export type HeaderTransitionConfig = {
  headerLeftInterpolator?: SceneInterpolator;
  headerLeftLabelInterpolator?: SceneInterpolator;
  headerLeftButtonInterpolator?: SceneInterpolator;
  headerTitleFromLeftInterpolator?: SceneInterpolator;
  headerTitleInterpolator?: SceneInterpolator;
  headerRightInterpolator?: SceneInterpolator;
  headerBackgroundInterpolator?: SceneInterpolator;
  headerLayoutInterpolator?: SceneInterpolator;
};

export type NavigationStackOptions = {
  title?: string;
  header?: ((props: HeaderProps) => React.ReactNode) | null;
  headerTitle?: string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerTitleContainerStyle?: StyleProp<ViewStyle>;
  headerTintColor?: string;
  headerTitleAllowFontScaling?: boolean;
  headerBackAllowFontScaling?: boolean;
  headerBackTitle?: string | null;
  headerBackTitleStyle?: StyleProp<TextStyle>;
  headerTruncatedBackTitle?: string;
  headerLeft?: React.FunctionComponent<HeaderBackbuttonProps> | null;
  headerLeftContainerStyle?: StyleProp<ViewStyle>;
  headerRight?: (() => React.ReactNode) | React.ReactNode;
  headerRightContainerStyle?: StyleProp<ViewStyle>;
  headerBackImage?: React.FunctionComponent<{
    tintColor: string;
    title?: string | null;
  }>;
  headerPressColorAndroid?: string;
  headerBackground?: string;
  headerTransparent?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
  headerForceInset?: React.ComponentProps<typeof SafeAreaView>['forceInset'];
  gesturesEnabled?: boolean;
  gestureDirection?: 'inverted' | 'normal';
  gestureResponseDistance?: {
    vertical: number;
    horizontal: number;
  };
  disableKeyboardHandling?: boolean;
};

export type NavigationStackConfig = {
  mode?: 'card' | 'modal';
  headerMode?: HeaderMode;
  headerLayoutPreset?: HeaderLayoutPreset;
  headerTransitionPreset?: HeaderTransitionPreset;
  headerBackgroundTransitionPreset?: HeaderBackgroundTransitionPreset;
  headerBackTitleVisible?: boolean;
  disableKeyboardHandling?: boolean;
  cardShadowEnabled?: boolean;
  cardOverlayEnabled?: boolean;
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
  transitionConfig?: (
    transitionProps: TransitionProps,
    prevTransitionProps?: TransitionProps,
    isModal?: boolean
  ) => HeaderTransitionConfig;
};

export type SceneDescriptorMap = {
  [key: string]: NavigationDescriptor<
    NavigationParams,
    NavigationStackOptions,
    NavigationStackProp
  >;
};

export type HeaderBackbuttonProps = {
  disabled?: boolean;
  onPress: () => void;
  pressColorAndroid?: string;
  tintColor: string;
  backImage?: NavigationStackOptions['headerBackImage'];
  title?: string | null;
  truncatedTitle?: string | null;
  backTitleVisible?: boolean;
  allowFontScaling?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  layoutPreset: HeaderLayoutPreset;
  width?: number;
  scene: Scene;
};

export type SceneInterpolatorProps = {
  mode?: HeaderMode;
  layout: TransitionerLayout;
  scene: Scene;
  scenes: Scene[];
  position: Animated.AnimatedInterpolation;
  navigation: NavigationStackProp;
  shadowEnabled?: boolean;
  cardOverlayEnabled?: boolean;
};

export type SceneInterpolator = (props: SceneInterpolatorProps) => any;

export type TransitionerLayout = {
  height: Animated.Value;
  width: Animated.Value;
  initHeight: number;
  initWidth: number;
  isMeasured: boolean;
};

export type TransitionProps = {
  layout: TransitionerLayout;
  navigation: NavigationStackProp;
  position: Animated.Value;
  scenes: Scene[];
  scene: Scene;
  index: number;
};

export type TransitionConfig = {
  transitionSpec: {
    timing: Function;
  };
  screenInterpolator: SceneInterpolator;
  containerStyle?: StyleProp<ViewStyle>;
  containerStyleLight?: StyleProp<ViewStyle>;
  containerStyleDark?: StyleProp<ViewStyle>;
};
