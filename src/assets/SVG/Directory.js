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
        fill="url(#paint0_linear_207_1179)"
      />
      <Path
        d="M27 17.667A6.34 6.34 0 0020.667 24c0 3.427 2.68 6.2 6.173 6.32a1.07 1.07 0 01.294 0h.093A6.317 6.317 0 0033.334 24 6.34 6.34 0 0027 17.667zM33.773 33.867c-3.72-2.48-9.786-2.48-13.533 0-1.693 1.133-2.627 2.666-2.627 4.306 0 1.64.934 3.16 2.614 4.28 1.866 1.254 4.32 1.88 6.773 1.88 2.453 0 4.907-.626 6.773-1.88 1.68-1.133 2.614-2.653 2.614-4.306-.014-1.64-.934-3.16-2.614-4.28zM41.654 24.787c.213 2.587-1.627 4.853-4.174 5.16h-.066c-.08 0-.16 0-.227.027-1.293.066-2.48-.347-3.373-1.107 1.373-1.227 2.16-3.067 2-5.067a6.189 6.189 0 00-1.027-2.907 4.79 4.79 0 016.867 3.893z"
        fill={colors.BACKGROUND}
      />
      <Path
        d="M44.32 37.12c-.106 1.293-.933 2.413-2.32 3.173-1.333.734-3.013 1.08-4.68 1.04.96-.866 1.52-1.946 1.627-3.093.133-1.653-.654-3.24-2.227-4.507-.893-.706-1.933-1.266-3.066-1.68 2.946-.853 6.653-.28 8.933 1.56 1.226.987 1.853 2.227 1.733 3.507z"
        fill={colors.BACKGROUND}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_207_1179"
          x1={61.577}
          y1={61.5769}
          x2={20.9464}
          y2={-11.0571}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#039E78" />
          <Stop offset={1} stopColor="#33FFCD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
