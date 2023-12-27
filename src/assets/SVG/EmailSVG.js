import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent({dark}) {
  let color = dark ? '#FFFFFF' : '#000806';
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={4}
        y={6.37231}
        width={16}
        height={12}
        rx={2}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M4 9.372l7.106 3.553a2 2 0 001.788 0L20 9.372"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
