import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {colors} = useTheme();
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.53 9.842l-5.06 5.06a3.576 3.576 0 115.06-5.06z"
        stroke={colors.TEXT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.82 6.142c-1.75-1.32-3.75-2.04-5.82-2.04-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.902c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47M15.51 13.072a3.565 3.565 0 01-2.82 2.82M9.47 14.902L2 22.372M22 2.372l-7.47 7.47"
        stroke={colors.TEXT}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
