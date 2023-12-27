import * as React from 'react';
import Svg, {Path, Mask, G, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill="url(#paint0_linear_31_11555)"
      />
      <Path
        d="M12 22.05c5.55 0 10.05-4.5 10.05-10.05 0-5.55-4.5-10.05-10.05-10.05C6.45 1.95 1.95 6.45 1.95 12c0 5.55 4.5 10.05 10.05 10.05z"
        fill="#fff"
      />
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={20}
        height={20}>
        <Path
          d="M12 21.35a9.35 9.35 0 100-18.7 9.35 9.35 0 000 18.7z"
          fill="#D9D9D9"
        />
      </Mask>
      <G mask="url(#a)" stroke="#fff" strokeWidth={0.285714}>
        <Path
          d="M5.465 14.658v.143H11.7v-.143a3.043 3.043 0 00-3.043-3.043h-.15a3.043 3.043 0 00-3.043 3.043z"
          fill="url(#paint1_linear_31_11555)"
        />
        <Path
          d="M8.58 8.165h0c-.965 0-1.747.782-1.747 1.747v0c0 .965.782 1.747 1.747 1.747h0c.965 0 1.747-.782 1.747-1.747v0c0-.965-.782-1.747-1.747-1.747z"
          fill="url(#paint2_linear_31_11555)"
        />
        <Path
          d="M12.415 14.658v.143h6.235v-.143a3.043 3.043 0 00-3.043-3.043h-.15a3.043 3.043 0 00-3.043 3.043z"
          fill="url(#paint3_linear_31_11555)"
        />
        <Path
          d="M15.53 8.165h0c-.965 0-1.747.782-1.747 1.747v0c0 .965.782 1.747 1.747 1.747h0c.965 0 1.747-.782 1.747-1.747v0c0-.965-.782-1.747-1.747-1.747z"
          fill="url(#paint4_linear_31_11555)"
        />
        <Path
          d="M21.946 16.019a3.115 3.115 0 10-6.231 0v3.916a3.116 3.116 0 006.23 0V16.02z"
          fill="url(#paint5_linear_31_11555)"
        />
        <Path
          d="M18.83 9.465h0c-.965 0-1.747.782-1.747 1.747v0c0 .965.782 1.747 1.747 1.747h0c.965 0 1.747-.782 1.747-1.747v0c0-.965-.782-1.747-1.747-1.747z"
          fill="url(#paint6_linear_31_11555)"
        />
        <Path
          d="M8.395 16.019a3.115 3.115 0 10-6.231 0v3.916a3.115 3.115 0 006.23 0V16.02z"
          fill="url(#paint7_linear_31_11555)"
        />
        <Path
          d="M5.28 9.465h0c-.965 0-1.748.782-1.748 1.747v0c0 .965.783 1.747 1.747 1.747h0c.965 0 1.748-.782 1.748-1.747v0c0-.965-.783-1.747-1.748-1.747z"
          fill="url(#paint8_linear_31_11555)"
        />
        <Path
          d="M15.35 16.158a3.293 3.293 0 10-6.585 0v4.15a3.293 3.293 0 006.586 0v-4.15z"
          fill="url(#paint9_linear_31_11555)"
        />
        <Path
          d="M13.9 11.058a1.843 1.843 0 10-3.685 0 1.843 1.843 0 003.685 0z"
          fill="url(#paint10_linear_31_11555)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_31_11555"
          x1={12}
          y1={0}
          x2={12}
          y2={24}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_31_11555"
          x1={8.58256}
          y1={11.7578}
          x2={8.58256}
          y2={14.6578}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_31_11555"
          x1={8.58027}
          y1={8.30777}
          x2={8.58027}
          y2={11.5162}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_31_11555"
          x1={15.5325}
          y1={11.758}
          x2={15.5325}
          y2={14.658}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint4_linear_31_11555"
          x1={15.53}
          y1={8.30777}
          x2={15.53}
          y2={11.5162}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint5_linear_31_11555"
          x1={18.8303}
          y1={13.0463}
          x2={18.8303}
          y2={22.9076}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint6_linear_31_11555"
          x1={18.8302}
          y1={9.60761}
          x2={18.8302}
          y2={12.816}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint7_linear_31_11555"
          x1={5.2794}
          y1={13.0463}
          x2={5.2794}
          y2={22.9076}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint8_linear_31_11555"
          x1={5.27944}
          y1={9.60761}
          x2={5.27944}
          y2={12.816}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint9_linear_31_11555"
          x1={12.058}
          y1={13.008}
          x2={12.058}
          y2={23.458}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
        <LinearGradient
          id="paint10_linear_31_11555"
          x1={12.0576}
          y1={9.35775}
          x2={12.0576}
          y2={12.7578}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDC4C" />
          <Stop offset={1} stopColor="#FCB408" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
