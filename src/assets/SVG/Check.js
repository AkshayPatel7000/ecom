import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Rect width={20} height={20} rx={4} fill="#222" />
      <Path
        d="M6.767 12.468L3.21 8.736 2 9.998 6.767 15 17 4.262 15.798 3l-9.031 9.468z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
