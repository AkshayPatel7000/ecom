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
        fill="url(#paint0_linear_31_11606)"
      />
      <Path
        d="M26.667 19.667v-2c0-.547-.454-1-1-1-.547 0-1 .453-1 1v2.08c.333-.04.64-.08 1-.08h1zM37.334 19.747v-2.08c0-.547-.454-1-1-1-.547 0-1 .453-1 1v2h1c.36 0 .666.04 1 .08z"
        fill={colors.BACKGROUND}
      />
      <Path
        d="M37.333 19.747v1.92c0 .546-.453 1-1 1-.546 0-1-.454-1-1v-2h-8.666v2c0 .546-.454 1-1 1-.547 0-1-.454-1-1v-1.92C20.734 20.107 19 22.64 19 26.333v11.334c0 4 2 6.666 6.667 6.666h10.666C41 44.333 43 41.667 43 37.667V26.333c0-3.693-1.733-6.226-5.667-6.586zM31 37.333h-5.333c-.547 0-1-.453-1-1 0-.546.453-1 1-1H31c.547 0 1 .454 1 1 0 .547-.453 1-1 1zm5.333-6.666H25.667c-.547 0-1-.454-1-1 0-.547.453-1 1-1h10.666c.547 0 1 .453 1 1 0 .546-.453 1-1 1z"
        fill={colors.BACKGROUND}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_31_11606"
          x1={61.577}
          y1={61.5769}
          x2={20.9464}
          y2={-11.0571}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#0084A0" />
          <Stop offset={1} stopColor="#2FCBED" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
