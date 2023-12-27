import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({dark}) {
  const color = dark ? '#fff' : '#000806';
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.06 7.25l4.89 4.89a1.49 1.49 0 002.1 0l4.89-4.89"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
