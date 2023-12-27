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
        d="M10.625 23.75H10c-5 0-7.5-1.25-7.5-7.5V10C2.5 5 5 2.5 10 2.5h10c5 0 7.5 2.5 7.5 7.5v6.25c0 5-2.5 7.5-7.5 7.5h-.625c-.387 0-.762.188-1 .5l-1.875 2.5c-.825 1.1-2.175 1.1-3 0l-1.875-2.5c-.2-.275-.662-.5-1-.5z"
        stroke="#808987"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 10h12.5M8.75 16.25h7.5"
        stroke="#808987"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
