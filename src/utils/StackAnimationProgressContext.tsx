import * as React from 'react';
import Animated from 'react-native-reanimated';

export default React.createContext<
  { [key: string]: Animated.Node<number> } | undefined
>(undefined);
