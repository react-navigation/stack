import React from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';
import { Screen } from 'react-native-screens';
import createPointerEventsContainer from './createPointerEventsContainer';

const EPS = 1e-5;
function getAccessibilityProps(isActive) {
  if (Platform.OS === 'ios') {
    return {
      accessibilityElementsHidden: !isActive,
    };
  } else if (Platform.OS === 'android') {
    return {
      importantForAccessibility: isActive ? 'yes' : 'no-hide-descendants',
    };
  } else {
    return null;
  }
}

/**
 * Component that renders the scene as card for the <StackView />.
 */
class Card extends React.Component {
  renderScreen = (flattenedStyle, animatedStyle) => (
    <Screen
      pointerEvents={this.props.pointerEvents}
      onComponentRef={this.props.onComponentRef}
      style={[
        StyleSheet.absoluteFill,
        this.props.animatedStyle || {},
        flattenedStyle,
      ]}
      active={
        this.props.transparent || this.props.scene.isActive
          ? 1
          : this.props.position.interpolate({
              inputRange: [
                this.props.scene.index,
                this.props.scene.index + 1 - EPS,
                this.props.scene.index + 1,
              ],
              outputRange: [1, 1, 0],
              extrapolate: 'clamp',
            })
      }
    >
      {!this.props.transparent &&
        animatedStyle.shadowOpacity && (
          <Animated.View
            style={[
              styles.shadow,
              { shadowOpacity: animatedStyle.shadowOpacity },
            ]}
            pointerEvents="none"
          />
        )}
      <Animated.View
        {...getAccessibilityProps(this.props.scene.isActive)}
        style={[
          this.props.transparent ? styles.transparent : styles.card,
          flattenedStyle.backgroundColor &&
          flattenedStyle.backgroundColor !== 'transparent'
            ? { backgroundColor: flattenedStyle.backgroundColor }
            : null,
        ]}
      >
        {this.props.children}
      </Animated.View>
      {animatedStyle.overlayOpacity && (
        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, { opacity: animatedStyle.overlayOpacity }]}
        />
      )}
    </Screen>
  );

  render = () =>
    this.renderScreen(
      StyleSheet.flatten(this.props.style) || {},
      this.props.animatedStyle || {}
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
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
  transparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default createPointerEventsContainer(Card);
