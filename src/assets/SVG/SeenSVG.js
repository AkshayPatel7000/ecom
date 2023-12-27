import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({color = '#808987'}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7 9.83l2.83 2.83L15.5 7"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 9.83l2.83 2.83L12.5 7"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
