import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import GlobalStyles from '../GlobalStyles/GlobalStyles';
import {ProfileSVG} from '../../assets/SVG';
import {isEmptyImage} from '../../utils/helperFunction';

const ProfileImage = ({image}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <LinearGradient
      colors={[colors.GRADIENT_GREEN_200, colors.GRADIENT_GREEN_100]}
      style={styles.main}>
      {image === '' || !image ? (
        <ProfileSVG />
      ) : (
        <Image source={isEmptyImage(image)} style={[GlobalStyles.imageWH]} />
      )}
    </LinearGradient>
  );
};

export default ProfileImage;

const getStyles = colors => {
  return StyleSheet.create({
    main: {
      width: 85,
      height: 85,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      ...GlobalStyles.greenButtonShadow,
      shadowColor: colors.PRIMARY_GREEN,
      backgroundColor: colors.BACKGROUND,
    },
    userDetails: {
      marginLeft: 15,
    },
  });
};
