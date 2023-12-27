import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.275 10.625l-2.058 2.058a2.912 2.912 0 000 4.125 2.912 2.912 0 004.125 0l3.241-3.241a5.84 5.84 0 000-8.25 5.84 5.84 0 00-8.25 0L3.8 8.85a5.01 5.01 0 000 7.075"
        stroke="#38CCAA"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
