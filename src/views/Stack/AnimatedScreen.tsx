import * as React from 'react';
import { ViewProps } from 'react-native';
import * as Screens from 'react-native-screens'; // Import with * as to prevent getters being called
import Animated from 'react-native-reanimated';
import memoize from '../../utils/memoize';

type Props = ViewProps & {
  next?: Animated.Node<number>;
  children: React.ReactNode;
};

const { block, cond, eq, call, set, onChange } = Animated;

const TRUE = 1;
const FALSE = 0;

export default class AnimatedScreen extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (prevProps.next && !this.props.next) {
      // If there's no next screen, this is the last one, keep it active
      this.setActive(true);
    }
  }

  private screen = React.createRef<any>();

  private initial = new Animated.Value(TRUE);

  private subscribe = memoize((next: Animated.Node<number>) =>
    block([
      cond(this.initial, [
        call([next], ([value]) =>
          // Set the value on first mount
          this.setActive(value !== 1)
        ),
        set(this.initial, FALSE),
      ]),
      onChange(
        cond(eq(next, 1), 0, 1),
        call([next], ([value]) =>
          // If the next screen is transitioning, i.e. progress is less than 1, set this screen to active
          this.setActive(value !== 1)
        )
      ),
    ])
  );

  private setActive = (active: boolean) => {
    const screen = this.screen.current;
    screen && screen.setNativeProps({ active: active ? 1 : 0 });
  };

  render() {
    const { next, children, ...rest } = this.props;

    return (
      <React.Fragment>
        {next ? <Animated.Code exec={this.subscribe(next)} /> : null}
        <Screens.NativeScreen ref={this.screen} active={1} {...rest}>
          {children}
        </Screens.NativeScreen>
      </React.Fragment>
    );
  }
}
