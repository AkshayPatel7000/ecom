import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15 25v-2M15 21v-2M15 17v-3c0-3.87 3.13-7 7-7h3M5 7h3c3.87 0 7 3.13 7 7v3"
        stroke="#3F68C9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 5L5 7l2 2M23 5l2 2-2 2"
        stroke="#3F68C9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
