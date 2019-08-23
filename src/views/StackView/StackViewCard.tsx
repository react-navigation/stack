import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Screen } from 'react-native-screens';
import { ThemeContext, ThemeColors } from '@react-navigation/core';

import createPointerEventsContainer, {
  InputProps,
  InjectedProps,
} from './createPointerEventsContainer';

type Props = InputProps &
  InjectedProps & {
    style: StyleProp<ViewStyle>;
    animatedStyle: any;
    position: Animated.AnimatedInterpolation;
    transparent?: boolean;
    children: React.ReactNode;
  };

const EPS = 1e-5;

function getAccessibilityProps(isActive: boolean) {
  if (Platform.OS === 'ios') {
    return {
      accessibilityElementsHidden: !isActive,
    };
  } else if (Platform.OS === 'android') {
    return {
      importantForAccessibility: isActive ? 'yes' : 'no-hide-descendants',
    };
  } else {
    return {};
  }
}

/**
 * Component that renders the scene as card for the <StackView />.
 */
class Card extends React.Component<Props> {
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  render() {
    const {
      children,
      pointerEvents,
      style,
      position,
      transparent,
      scene: { index, isActive },
    } = this.props;

    const active: Animated.Value | number | boolean = Platform.select({
      web: isActive,
      // @ts-ignore
      default:
        transparent || isActive
          ? 1
          : position.interpolate({
              inputRange: [index, index + 1 - EPS, index + 1],
              outputRange: [1, 1, 0],
              extrapolate: 'clamp',
            }),
    });

    // animatedStyle can be `false` if there is no screen interpolator
    const animatedStyle = this.props.animatedStyle || {};

    const {
      shadowOpacity,
      overlayOpacity,
      ...containerAnimatedStyle
    } = animatedStyle;

    let flattenedStyle = StyleSheet.flatten(style) || {};
    let { backgroundColor, ...screenStyle } = flattenedStyle;
    let isDark = this.context === 'dark';
    let baseCardStyle;

    if (isDark) {
      baseCardStyle = transparent ? styles.transparentDark : styles.cardDark;
    } else {
      baseCardStyle = transparent ? styles.transparentLight : styles.cardLight;
    }

    return (
      <Screen
        pointerEvents={pointerEvents}
        onComponentRef={this.props.onComponentRef}
        style={[containerAnimatedStyle, screenStyle]}
        // @ts-ignore
        active={active}
      >
        {!transparent && shadowOpacity ? (
          <Animated.View
            style={[styles.shadow, { shadowOpacity }]}
            pointerEvents="none"
          />
        ) : null}
        <Animated.View
          {...getAccessibilityProps(isActive)}
          style={[
            baseCardStyle,
            backgroundColor && backgroundColor !== 'transparent'
              ? { backgroundColor }
              : null,
          ]}
        >
          {children}
        </Animated.View>
        {overlayOpacity ? (
          <Animated.View
            pointerEvents="none"
            style={[
              isDark ? styles.overlayDark : styles.overlayLight,
              { opacity: overlayOpacity },
            ]}
          />
        ) : null}
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  cardLight: {
    flex: 1,
    backgroundColor: ThemeColors.light.body,
  },
  cardDark: {
    flex: 1,
    backgroundColor: ThemeColors.dark.body,
  },
  overlayLight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  overlayDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  // TODO: what should shadow be styled like?
  shadow: {
    top: 0,
    left: 0,
    bottom: 0,
    width: 3,
    position: 'absolute',
    backgroundColor: '#fff',
    shadowOffset: { width: -1, height: 1 },
    shadowRadius: 5,
    shadowColor: '#000',
  },
  transparentLight: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  transparentDark: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default createPointerEventsContainer(Card);
