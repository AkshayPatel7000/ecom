import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {CloseEyeSVG, EyeOpen} from '../../assets/SVG';
import {FONTFAMILY, FONTSIZE} from '../../utils/Resource';
import {moderateScale} from '../../utils/responsive';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
TextInput.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};
const CustomInput = ({
  placeholder = 'email@example.com',
  value = '',
  containerStyle,
  leftIcon,
  rightIcon,
  inputStyle,
  title = '',
  hasError = false,
  errorMsg = '',
  rightIconPress,
  defaultMainStyle,
  keyboardType,
  editable = true,
  setValue = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  if (title === 'password') {
    return (
      <View style={containerStyle}>
        {title && (
          <CustomText style={styles.title} viewStyles={styles.titleViewStyles}>
            {title}
          </CustomText>
        )}
        <View
          style={[
            defaultMainStyle,
            styles.defaultContainer,
            hasError && styles.errorBorder,
          ]}>
          {leftIcon && leftIcon}
          <TextInput
            style={[styles.defaultInput, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={'#C2C2C2'}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            onChangeText={text => {
              setValue(text);
            }}
          />

          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={styles.rightIconStyles}>
            {!secureTextEntry ? <EyeOpen /> : <CloseEyeSVG />}
            {/* <Icon
              name={!secureTextEntry ? <EyeOpen /> : <CloseEyeSVG />}
              color={colors.TEXT}
              size={25}
            /> */}
          </TouchableOpacity>
        </View>
        {hasError && (
          <CustomText style={styles.error}>
            {errorMsg ? errorMsg : title + ' is required!'}
          </CustomText>
        )}
      </View>
    );
  } else {
    return (
      <View style={containerStyle}>
        {title && (
          <CustomText style={styles.title} viewStyles={styles.titleViewStyles}>
            {title}
          </CustomText>
        )}

        <View
          style={[
            styles.defaultContainer,
            defaultMainStyle,
            hasError && styles.errorBorder,
          ]}>
          {leftIcon && leftIcon}
          <TextInput
            editable={editable}
            autoCapitalize={'none'}
            style={[styles.defaultInput, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={'#C2C2C2'}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType={keyboardType}
            onChangeText={text => {
              setValue(text);
            }}
          />
          {rightIcon && (
            <TouchableOpacity
              onPress={rightIconPress && rightIconPress}
              style={[styles.rightIconStyles]}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
        {hasError && (
          <CustomText style={styles.error}>
            {errorMsg ? errorMsg : title + ' is required!'}
          </CustomText>
        )}
      </View>
    );
  }
};

const getStyles = colors => {
  return StyleSheet.create({
    title: {
      fontSize: FONTSIZE.Text14,
      ...GlobalStyles.W400,

      textTransform: 'capitalize',
    },
    errorBorder: {borderColor: colors.RED_LIGHT},
    error: {
      fontSize: FONTSIZE.Text12,
      ...GlobalStyles.W400,
      color: colors.RED_DARK,
      marginTop: 5,
    },
    defaultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.INPUT_BORDER,
      borderRadius: 20,
      height: 55,
      paddingHorizontal: moderateScale(20),
    },
    defaultInput: {
      color: colors.TEXT,
      paddingLeft: 10,
      // width: '85%',
      flex: 1,
      marginLeft: moderateScale(2),
      fontSize: FONTSIZE.Text14,
      fontWeight: '500',
      fontFamily: FONTFAMILY.PoppinsMedium,
    },
    rightIconStyles: {
      width: '10%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    titleViewStyles: {
      marginVertical: 5,
    },
  });
};

export default CustomInput;
