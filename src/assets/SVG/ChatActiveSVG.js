import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M22.667 2.667H9.333c-3.68 0-6.666 2.973-6.666 6.64v9.306c0 3.667 2.986 6.64 6.666 6.64h2c.36 0 .84.24 1.067.534l2 2.653c.88 1.173 2.32 1.173 3.2 0l2-2.653a1.352 1.352 0 011.067-.534h2c3.68 0 6.666-2.973 6.666-6.64V9.307c0-3.667-2.986-6.64-6.666-6.64zm-5.334 15.666h-8c-.546 0-1-.453-1-1 0-.546.454-1 1-1h8c.547 0 1 .454 1 1 0 .547-.453 1-1 1zm5.334-6.666H9.333c-.546 0-1-.454-1-1 0-.547.454-1 1-1h13.334c.546 0 1 .453 1 1 0 .546-.454 1-1 1z"
        fill="#38CCAA"
      />
    </Svg>
  );
}

export default SvgComponent;
