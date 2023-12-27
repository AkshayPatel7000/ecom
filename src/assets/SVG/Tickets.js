import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Rect, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgComponent(props) {
  const {colors} = useTheme();

  return (
    <Svg
      width={62}
      height={62}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        x={0.42334}
        y={0.423218}
        width={61.1537}
        height={61.1537}
        rx={30.5768}
        fill="url(#paint0_linear_31_11589)"
      />
      <Path
        d="M36.52 18.947l-12.04 4c-8.093 2.707-8.093 7.12 0 9.813l3.573 1.187 1.187 3.573c2.694 8.093 7.12 8.093 9.814 0l4.013-12.027c1.786-5.4-1.147-8.346-6.547-6.546zm.427 7.173l-5.067 5.093a.99.99 0 01-.706.294.989.989 0 01-.707-.294 1.006 1.006 0 010-1.413l5.066-5.093a1.006 1.006 0 011.414 0 1.006 1.006 0 010 1.413z"
        fill={colors.BACKGROUND}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_31_11589"
          x1={31.0002}
          y1={1.23697}
          x2={31.0002}
          y2={60.7631}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
