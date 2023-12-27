import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({size = 49}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M24.5 24.5c5.638 0 10.208-4.57 10.208-10.208S30.138 4.083 24.5 4.083s-10.208 4.57-10.208 10.209c0 5.638 4.57 10.208 10.208 10.208zM24.5 29.604c-10.229 0-18.559 6.86-18.559 15.313 0 .571.45 1.02 1.021 1.02h35.076c.572 0 1.02-.449 1.02-1.02 0-8.453-8.33-15.313-18.558-15.313z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
