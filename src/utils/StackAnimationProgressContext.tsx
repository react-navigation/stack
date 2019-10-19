import * as React from 'react';
import Animated from 'react-native-reanimated';

type Progress = {
  current: Animated.Value<number>;
  next?: Animated.Value<number>;
};

export default React.createContext<Progress>({
  current: new Animated.Value(0),
  next: undefined,
});
