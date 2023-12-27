import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FONTFAMILY} from '../../utils/Resource';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

const CustomButton = ({
  title = 'Submit',
  onPress = () => {},
  containerStyles,
  textStyle,
  isDisable,
}) => {
  const styles = getStyles();
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.buttonView,
        containerStyles,
        GlobalStyles.greenButtonShadow,
        {shadowColor: isDisable ? colors.GRAY200 : colors.GRADIENT_GREEN_200},
      ]}>
      <LinearGradient
        colors={
          isDisable
            ? [colors.BORDER, colors.BORDER]
            : [colors.GRADIENT_GREEN_200, colors.GRADIENT_GREEN_100]
        }
        style={styles.LinearGradient}>
        <TouchableOpacity
          style={styles.touchButton}
          disabled={isDisable || false}
          onPress={() => {
            onPress();
          }}>
          <CustomText style={[styles.text, textStyle]}>{title}</CustomText>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const getStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    text: {
      color: colors.white,
      fontSize: 16,

      fontWeight: '600',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
    },
    buttonView: {
      width: '100%',
      maxHeight: 55,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    shadowStyle: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.41,
      elevation: 10,
    },
    touchButton: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    LinearGradient: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
  });
};

export default CustomButton;
