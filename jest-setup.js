/* eslint-env jest */

jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  BaseButton: 'BaseButton',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeArea: () => ({ top: 0, left: 0, bottom: 0, right: 0 }),
}));
