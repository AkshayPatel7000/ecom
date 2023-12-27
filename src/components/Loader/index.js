import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import BlurPNG from '../../assets/Images/blur.png';
const Loader = () => {
  const {colors} = useTheme();
  const styles = GetStyles(colors);

  return (
    <ImageBackground style={styles.container} blurRadius={90} source={BlurPNG}>
      <View style={styles.main}>
        <Lottie
          source={require('./loader.json')}
          autoPlay
          useNativeLooping
          style={styles.lottie}
          loop
        />
      </View>
    </ImageBackground>
  );
};

export default Loader;

const GetStyles = colors => {
  return StyleSheet.create({
    main: {
      width: 160,
      height: 160,

      backgroundColor: '#fff',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#fff',
      elevation: 3,
    },
    container: {
      flex: 1,

      backgroundColor: 'rgba(85, 94, 105, 0.9)',

      position: 'absolute',
      zIndex: 999,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {width: 160},
  });
};
