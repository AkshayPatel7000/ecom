import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

const RoundAvatar = ({
  name = '',
  image = '',
  size = 25,
  backgroundColor = '#1D8FFA',
  textSize = 16,
  textStyles,
  imageContainerStyles,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  let initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('');

  if (image && image !== '') {
    return (
      <View
        style={[
          styles.imageContainer,
          {backgroundColor: backgroundColor},
          imageContainerStyles,
          {width: size, height: size, borderRadius: size / 2},
        ]}>
        <Image
          source={{uri: image}}
          style={[GlobalStyles.imageWH, styles.image, {borderRadius: size / 2}]}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.imageContainer,
          {backgroundColor: backgroundColor},
          {width: size, height: size, borderRadius: size / 2},
          imageContainerStyles,
        ]}>
        <CustomText
          numberOfLines={1}
          style={[styles.initials, textStyles, {fontSize: textSize}]}>
          {initials?.slice(0, 2)}
        </CustomText>
      </View>
    );
  }
};

export default RoundAvatar;

const getStyles = colors => {
  return StyleSheet.create({
    image: {
      borderRadius: 50,
    },
    imageContainer: {
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: colors.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
    },
    initials: {
      color: colors.white,
      ...GlobalStyles.W600,
      fontSize: 16,
      textTransform: 'uppercase',
      marginTop: 2,
    },
  });
};
