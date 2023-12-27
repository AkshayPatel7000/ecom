import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent({dark = false}) {
  let color = dark ? '#FFFFFF' : '#000806';
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx={9} cy={14.3723} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M12 11.372l3.5-3.5m1.5-1.5l-1.5 1.5m0 0l2.5 2.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
