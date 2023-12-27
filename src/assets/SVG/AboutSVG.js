import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {colors} = useTheme();

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.32 3H5.09C3.1 3 2.1 4.01 2.1 6.02V22h5.4v-3.75a.749.749 0 111.5 0V22h5.3V6.02c0-2.01-.99-3.02-2.98-3.02zm-.57 9.75H5.8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.95c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.75H5.8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.95c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill={colors.TEXT}
      />
      <Path
        d="M23 21.25h-2.27v-3c.95-.31 1.64-1.2 1.64-2.25v-2c0-1.31-1.07-2.38-2.38-2.38-1.31 0-2.38 1.07-2.38 2.38v2c0 1.04.68 1.92 1.61 2.24v3.01H1c-.41 0-.75.34-.75.75s.34.75.75.75h18.93c.02 0 .03.01.05.01.02 0 .03-.01.05-.01H23c.41 0 .75-.34.75-.75s-.34-.75-.75-.75z"
        fill={colors.TEXT}
      />
    </Svg>
  );
}

export default SvgComponent;
