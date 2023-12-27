import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12.3723} r={3} stroke="#000806" strokeWidth={2} />
      <Path
        d="M20.188 11.307c.388.47.582.707.582 1.065 0 .36-.194.595-.582 1.066-1.42 1.724-4.552 4.934-8.188 4.934-3.636 0-6.768-3.21-8.188-4.934-.388-.471-.582-.707-.582-1.066 0-.358.194-.594.582-1.065C5.232 9.582 8.364 6.372 12 6.372c3.636 0 6.768 3.21 8.188 4.935z"
        stroke="#000806"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
