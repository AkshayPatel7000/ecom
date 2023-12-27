import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {FONTSIZE} from '../../utils/Resource';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
TextInput.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};
const NormalInput = ({
  defaultMainStyle,
  onChangeText,
  value,
  placeHolder,
  multiline = false,
  height = 55,
  title = '',
  hasError = false,
  errorMsg = '',
  editable = true,
}) => {
  const [textHeight, setTextHeight] = useState(height);
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <>
      <View
        style={[
          {
            borderWidth: 1,
            backgroundColor: colors.INPUT_BG,
            borderRadius: 20,
            paddingHorizontal: 20,
            borderColor: colors.INPUT_BORDER,
            // justifyContent: 'center',
            marginVertical: 8,
            maxHeight: 250,
          },
          hasError && {borderColor: colors.RED_100},
          multiline && {height: textHeight, paddingVertical: 10},
        ]}>
        <TextInput
          editable={editable}
          style={[
            {
              height: textHeight,
              maxHeight: 200,
              fontSize: FONTSIZE.TEXT14,
              color: colors.TEXT,
              ...GlobalStyles.W400,
            },
            multiline && {textAlignVertical: 'top'},
            defaultMainStyle,
          ]}
          placeholder={placeHolder}
          placeholderTextColor={colors.GRAY300}
          value={value}
          multiline={multiline}
          onChangeText={e => {
            onChangeText && onChangeText(e);
            setTextHeight(height + (e.split('\n').length - 1) * 20);
          }}
        />
      </View>
      {hasError && (
        <CustomText style={styles.error}>
          {errorMsg ? errorMsg : title + ' is required!'}
        </CustomText>
      )}
    </>
  );
};

export default NormalInput;
const getStyles = colors => {
  return StyleSheet.create({
    error: {
      // fontSize: FONTSIZE.Text14,
      ...GlobalStyles.W400,
      color: colors.RED_100,
      marginVertical: 0,
    },
  });
};
