import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {colors} = useTheme();
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 12.5a5 5 0 100-10 5 5 0 000 10zM20.59 22.5c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
        stroke={colors.TEXT}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
