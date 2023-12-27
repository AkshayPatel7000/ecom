import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={14}
      height={15}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.947 2.08L1.79 8.596c-.233.247-.458.735-.503 1.072L1.01 12.1c-.098.878.532 1.478 1.402 1.328l2.415-.413c.338-.06.81-.307 1.043-.562l6.157-6.518c1.065-1.125 1.545-2.407-.112-3.975-1.65-1.552-2.903-1.005-3.968.12zM6.92 3.167a4.595 4.595 0 004.087 3.862"
        stroke="#38CCAA"
        strokeWidth={1.3773}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
