import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../CustomText/CustomText';

import {useTheme} from '@react-navigation/native';
import {GLogo, MS_LOGO} from '../../Assets/Images';
import {FONTFAMILY, FONTSIZE} from '../../Utils/Resource';

const SocialButton = ({onPress, containerStyles, type = 'M'}) => {
  const styles = getStyles();
  switch (type) {
    case 'M':
      return (
        <TouchableOpacity
          onPress={onPress && onPress}
          style={[styles.main, containerStyles]}>
          <View style={styles.button}>
            <View style={styles.imageCont}>
              <Image source={MS_LOGO} style={styles.image} />
            </View>
            <CustomText style={styles.title}>
              Continue with Microsoft
            </CustomText>
          </View>
        </TouchableOpacity>
      );
    case 'G':
      return (
        <TouchableOpacity
          onPress={onPress && onPress}
          style={[styles.main, containerStyles]}>
          <View style={styles.button}>
            <View style={styles.imageCont}>
              <Image source={GLogo} style={styles.image} resizeMode="contain" />
            </View>
            <CustomText style={styles.title}>Continue with Google</CustomText>
          </View>
        </TouchableOpacity>
      );
  }
};

export default SocialButton;
const getStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    main: {
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 15,
      borderColor: colors.BORDER,
      maxHeight: 55,
    },
    button: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // backgroundColor: 'red',
      width: 200,
    },
    imageCont: {
      width: 25,
      height: 25,
      marginRight: 9,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    title: {
      fontSize: FONTSIZE.Text14,
      fontWeight: '500',
      fontFamily: FONTFAMILY.PoppinsMedium,
    },
  });
};
