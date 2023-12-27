import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M25.05 8.525l-7.2-5.038c-1.963-1.375-4.975-1.3-6.863.163L4.726 8.537c-1.25.975-2.238 2.975-2.238 4.55v8.625c0 3.188 2.588 5.788 5.775 5.788h13.476a5.777 5.777 0 005.774-5.775V13.25c0-1.688-1.087-3.763-2.462-4.725zM15.937 22.5a.944.944 0 01-.937.938.944.944 0 01-.938-.938v-3.75c0-.512.426-.938.938-.938s.938.425.938.938v3.75z"
        fill="#38CCAA"
      />
    </Svg>
  );
}

export default SvgComponent;
