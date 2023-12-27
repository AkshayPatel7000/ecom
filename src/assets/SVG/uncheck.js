import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <Rect
        x={1}
        y={1}
        width={18}
        height={18}
        rx={3}
        stroke="#9B9B9B"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
