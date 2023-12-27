import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTFAMILY, FONTSIZE} from '../../utils/Resource';
Text.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};
const CustomText = (
  {
    style = {},
    text = '-',
    numberOfLines = 1,
    viewStyles = {},
    children = '-',
    onTextLayout,
  },
  props,
) => {
  const {colors} = useTheme();
  return (
    <View style={viewStyles}>
      <Text
        {...props}
        onTextLayout={onTextLayout}
        numberOfLines={numberOfLines}
        style={[
          {
            color: colors.TEXT,
            fontFamily: FONTFAMILY.PoppinsMedium,
            fontSize: FONTSIZE.Text12,
          },
          style,
        ]}>
        {children !== null &&
        children !== 'null' &&
        children !== 'undefined' &&
        children !== undefined
          ? children
          : '-'}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
