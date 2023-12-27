import * as React from 'react';
import Svg, {
  G,
  Mask,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width={300}
      height={324}
      viewBox="0 0 300 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_201_2368)">
        <Mask
          id="a"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={50}
          y={146}
          width={200}
          height={141}>
          <Path d="M250 146H50v141h200V146z" fill="#fff" />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M150 268.485c-75.636 44.561-136.944 1.338-73.738-51.985-63.206-53.323-1.898-96.545 73.738-51.985 75.621-44.56 136.944-1.338 73.738 51.985 63.206 53.282 1.883 96.546-73.738 51.985z"
            fill="url(#paint0_linear_201_2368)"
          />
        </G>
      </G>
      <G filter="url(#filter0_d_201_2368)">
        <Rect
          x={101}
          y={196}
          width={98}
          height={98}
          rx={49}
          fill="#fff"
          fillOpacity={0.4}
          shapeRendering="crispEdges"
        />
      </G>
      <G opacity={0.4} filter="url(#filter1_f_201_2368)">
        <Rect
          x={119.304}
          y={244.725}
          width={61.3913}
          height={43.2868}
          rx={21.6434}
          fill="#00A77E"
        />
      </G>
      <Rect
        x={110.572}
        y={205.572}
        width={78.8561}
        height={78.8561}
        rx={39.428}
        fill="url(#paint1_linear_201_2368)"
      />
      <Path
        d="M150 225.833c-10.561 0-19.167 8.606-19.167 19.167 0 10.561 8.606 19.167 19.167 19.167 10.561 0 19.167-8.606 19.167-19.167 0-10.561-8.606-19.167-19.167-19.167zm9.162 14.759l-10.868 10.867a1.432 1.432 0 01-2.031 0l-5.425-5.424a1.448 1.448 0 010-2.032 1.448 1.448 0 012.032 0l4.408 4.409 9.852-9.852a1.446 1.446 0 012.032 0 1.446 1.446 0 010 2.032z"
        fill="#fff"
      />
      <G clipPath="url(#clip1_201_2368)">
        <Mask
          id="b"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={50}
          height={50}>
          <Path d="M50 0H0v50h50V0z" fill="#fff" />
        </Mask>
        <G mask="url(#b)">
          <Path
            d="M25 50c-.724-23.684-1.316-24.273-25-25 23.684-.724 24.273-1.316 25-25 .724 23.684 1.316 24.273 25 25-23.684.727-24.273 1.308-25 25z"
            fill="#F6AE39"
          />
        </G>
      </G>
      <G clipPath="url(#clip2_201_2368)">
        <Mask
          id="c"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={91}
          y={74}
          width={25}
          height={25}>
          <Path d="M116 74H91v25h25V74z" fill="#fff" />
        </Mask>
        <G mask="url(#c)">
          <Path
            d="M103.5 99c-.362-11.842-.658-12.136-12.5-12.5 11.842-.362 12.136-.658 12.5-12.5.362 11.842.658 12.136 12.5 12.5-11.842.364-12.136.654-12.5 12.5z"
            fill="#38CCAA"
          />
        </G>
      </G>
      <G clipPath="url(#clip3_201_2368)">
        <Mask
          id="d"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={186}
          y={0}
          width={38}
          height={38}>
          <Path d="M223.5 0H186v37.5h37.5V0z" fill="#fff" />
        </Mask>
        <G mask="url(#d)">
          <Path
            d="M204.75 37.5c-.543-17.763-.987-18.204-18.75-18.75 17.763-.543 18.204-.987 18.75-18.75.543 17.763.987 18.204 18.75 18.75-17.763.546-18.204.981-18.75 18.75z"
            fill="#3A82E2"
          />
        </G>
      </G>
      <G clipPath="url(#clip4_201_2368)">
        <Mask
          id="e"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={250}
          y={86}
          width={50}
          height={50}>
          <Path d="M300 86h-50v50h50V86z" fill="#fff" />
        </Mask>
        <G mask="url(#e)">
          <Path
            d="M275 136c-.724-23.684-1.316-24.272-25-25 23.684-.724 24.273-1.316 25-25 .724 23.684 1.316 24.273 25 25-23.684.728-24.272 1.308-25 25z"
            fill="#02123B"
          />
        </G>
      </G>
      <G clipPath="url(#clip5_201_2368)">
        <Mask
          id="f"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={43}
          y={243}
          width={25}
          height={25}>
          <Path d="M68 243H43v25h25v-25z" fill="#fff" />
        </Mask>
        <G mask="url(#f)">
          <Path
            d="M55.5 268c-.362-11.842-.658-12.136-12.5-12.5 11.842-.362 12.136-.658 12.5-12.5.362 11.842.658 12.136 12.5 12.5-11.842.364-12.136.654-12.5 12.5z"
            fill="#F6AE39"
          />
        </G>
      </G>
      <G clipPath="url(#clip6_201_2368)">
        <Mask
          id="g"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={244}
          y={175}
          width={25}
          height={25}>
          <Path d="M269 175h-25v25h25v-25z" fill="#fff" />
        </Mask>
        <G mask="url(#g)">
          <Path
            d="M256.5 200c-.362-11.842-.658-12.136-12.5-12.5 11.842-.362 12.136-.658 12.5-12.5.362 11.842.658 12.136 12.5 12.5-11.842.364-12.136.654-12.5 12.5z"
            fill="#F6AE39"
          />
        </G>
      </G>
      <G clipPath="url(#clip7_201_2368)">
        <Mask
          id="h"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={151}
          width={38}
          height={38}>
          <Path d="M37.5 151H0v37.5h37.5V151z" fill="#fff" />
        </Mask>
        <G mask="url(#h)">
          <Path
            d="M18.75 188.5c-.543-17.763-.987-18.204-18.75-18.75 17.763-.543 18.204-.987 18.75-18.75.543 17.763.987 18.204 18.75 18.75-17.763.546-18.204.981-18.75 18.75z"
            fill="#3A82E2"
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_201_2368"
          x1={149.999}
          y1={146}
          x2={149.999}
          y2={287}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#EAFFFA" />
          <Stop offset={1} stopColor="#EAFFFA" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_201_2368"
          x1={189.428}
          y1={284.428}
          x2={137.036}
          y2={190.768}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#039E78" />
          <Stop offset={1} stopColor="#33FFCD" />
        </LinearGradient>
        <ClipPath id="clip0_201_2368">
          <Path fill="#fff" transform="translate(50 146)" d="M0 0H200V141H0z" />
        </ClipPath>
        <ClipPath id="clip1_201_2368">
          <Path fill="#fff" d="M0 0H50V50H0z" />
        </ClipPath>
        <ClipPath id="clip2_201_2368">
          <Path fill="#fff" transform="translate(91 74)" d="M0 0H25V25H0z" />
        </ClipPath>
        <ClipPath id="clip3_201_2368">
          <Path fill="#fff" transform="translate(186)" d="M0 0H37.5V37.5H0z" />
        </ClipPath>
        <ClipPath id="clip4_201_2368">
          <Path fill="#fff" transform="translate(250 86)" d="M0 0H50V50H0z" />
        </ClipPath>
        <ClipPath id="clip5_201_2368">
          <Path fill="#fff" transform="translate(43 243)" d="M0 0H25V25H0z" />
        </ClipPath>
        <ClipPath id="clip6_201_2368">
          <Path fill="#fff" transform="translate(244 175)" d="M0 0H25V25H0z" />
        </ClipPath>
        <ClipPath id="clip7_201_2368">
          <Path
            fill="#fff"
            transform="translate(0 151)"
            d="M0 0H37.5V37.5H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
