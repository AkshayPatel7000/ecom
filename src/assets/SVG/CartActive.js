import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path d="M18 14l3-9H4.786l1.285 9h11.93z" fill={'#38CCAA'} />
      <Path
        d="M2 3h2.5l2 14H17m0 0a2 2 0 100 4 2 2 0 000-4zM6.071 14H18l3-9H4.786M11 19a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="#808987"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
