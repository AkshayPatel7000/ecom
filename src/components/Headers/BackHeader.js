import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useNavigation, useTheme} from '@react-navigation/native';

import {BackSVG} from '../../assets/SVG';
import {FONTFAMILY, FONTSIZE} from '../../utils/Resource';
import {moderateScale} from '../../utils/responsive';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
const BackHeader = ({
  Title = '',
  goBack,
  showBack = true,
  rightIconsOne,
  rightIconsOnePress,
  bigTitle,
  bigTitleStyles,
}) => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const moveTo = () => {
    goBack ? goBack() : navigation.goBack();
  };
  return (
    <>
      <View style={[styles.main, GlobalStyles.shadow]}>
        <View style={{flexDirection: 'row'}}>
          {showBack && (
            <TouchableOpacity onPress={moveTo}>
              <BackSVG dark={dark} />
            </TouchableOpacity>
          )}

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <CustomText
              style={styles.title}
              viewStyles={styles.titleViewStyles}>
              {Title}
            </CustomText>
          </View>

          {rightIconsOne ? (
            <TouchableOpacity
              onPress={rightIconsOnePress && rightIconsOnePress}
              style={styles.rightIconStyles}>
              {rightIconsOne}
            </TouchableOpacity>
          ) : (
            <View style={{width: 30}} />
          )}
        </View>
      </View>
      {bigTitle && (
        <CustomText style={[styles.heading, bigTitleStyles]}>
          {bigTitle}
        </CustomText>
      )}
    </>
  );
};

export default BackHeader;
const getStyles = colors => {
  return StyleSheet.create({
    heading: {
      ...GlobalStyles.W700,
      fontSize: FONTSIZE.Text34,
      paddingHorizontal: moderateScale(20),
      marginTop: 10,
    },
    main: {
      flexDirection: 'row',
      paddingHorizontal: moderateScale(15),
      alignItems: 'flex-end',
      paddingVertical: 20,
      height: 90,
      backgroundColor: colors.BACKGROUND,
    },
    title: {
      fontSize: FONTSIZE.Text16,
      fontWeight: '400',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
    },
    titleViewStyles: {
      marginHorizontal: moderateScale(15),
      flex: 1,
    },
    rightIconStyles: {
      marginHorizontal: moderateScale(5),
    },
    gap: {
      width: 5,
    },
  });
};
