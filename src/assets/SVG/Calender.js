import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({color = '#DA9B3C'}, props) {
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 1.745v2.25M12 1.745v2.25M2.625 7.063h12.75M15.75 6.62v6.375c0 2.25-1.125 3.75-3.75 3.75H6c-2.625 0-3.75-1.5-3.75-3.75V6.62c0-2.25 1.125-3.75 3.75-3.75h6c2.625 0 3.75 1.5 3.75 3.75z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.771 10.52h.007M11.771 12.77h.007M8.997 10.52h.006M8.997 12.77h.006M6.22 10.52h.007M6.22 12.77h.007"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
