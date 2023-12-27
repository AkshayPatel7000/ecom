import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 16.5c4.125 0 7.5-3.375 7.5-7.5S13.125 1.5 9 1.5 1.5 4.875 1.5 9s3.375 7.5 7.5 7.5zM6.878 11.122l4.245-4.245M11.123 11.122L6.878 6.877"
        stroke="#979797"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
