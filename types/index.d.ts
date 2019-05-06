declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  declare const value: ImageSourcePropType;

  export default value;
}

declare module 'react-dom';
