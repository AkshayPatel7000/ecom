import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({dark}) {
  const color = dark ? '#ffff' : '#00130F';
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 22.5c5.5 0 10-4.5 10-10s-4.5-10-10-10S2 7 2 12.5s4.5 10 10 10zM9.17 15.33l5.66-5.66M14.83 15.33L9.17 9.67"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
