import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AddSVG} from '../../assets/SVG';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

const FAB = ({onPress, containerStyles, icon, shapeStyles, fabHead}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          position: 'absolute',
          bottom: 50,
          borderRadius: 40,
          right: 20,
          ...containerStyles,
          backgroundColor: colors.BACKGROUND,
        },
        fabHead,
      ]}
      onPress={onPress && onPress}>
      <LinearGradient
        colors={[colors.GRADIENT_GREEN_200, colors.GRADIENT_GREEN_100]}
        style={[
          {
            width: 54,
            height: 54,
            shadowColor: colors.GRADIENT_GREEN_200,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.WHITE,
          },
          GlobalStyles.greenButtonShadow,
          shapeStyles,
        ]}>
        {icon ? icon : <AddSVG />}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({});
