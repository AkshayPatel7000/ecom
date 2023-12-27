import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CrossCircle, FilterSVG, Search} from '../../assets/SVG';
import {FONTFAMILY, FONTSIZE, width} from '../../utils/Resource';
import {moderateScale} from '../../utils/responsive';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import {useEffect} from 'react';

TextInput.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};
const SearchBar = ({
  onChangeProp,
  onCrossPress,
  valueProp = '',
  rightIcon = true,
  placeholder = 'Search...',
}) => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(valueProp);
  const [showDropDown, setShowDropDown] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(true);
  };
  const onRightIconPress = () => {
    if (value?.trim() !== '') {
      setValue('');
      onCrossPress && onCrossPress();
    }
  };

  const onChange = e => {
    setShowDropDown(false);
    onChangeProp && onChangeProp(e);
    setValue(e);
  };
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.main,
          GlobalStyles.shadow,
          isFocused
            ? {shadowColor: colors.GRADIENT_GREEN_200}
            : {shadowColor: colors.INPUT_BORDER},
          {borderColor: isFocused ? colors.PRIMARY_GREEN : colors.INPUT_BORDER},
        ]}>
        <Search color={colors.GRAY300} />
        <TextInput
          style={styles.inputStyles}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.GRAY300}
        />

        <TouchableOpacity onPress={onRightIconPress}>
          {value?.trim() !== '' ? (
            <CrossCircle dark={dark} />
          ) : (
            rightIcon && <FilterSVG />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const getStyles = colors => {
  return StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 9999,
      paddingHorizontal: 18,
    },
    main: {
      borderRadius: 20,
      borderWidth: 1,
      zIndex: 9999,

      width: '100%',
      height: 55,
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 15,
      backgroundColor: colors.INPUT_BG,
    },
    inputStyles: {
      flex: 1,
      height: 55,
      paddingHorizontal: 10,
      color: colors.TEXT,
      fontWeight: '500',
      fontFamily: FONTFAMILY.PoppinsMedium,
      fontSize: FONTSIZE.Text14,
    },
    dropDown: {
      alignSelf: 'center',
      width: '100%',
      zIndex: 9999,
      backgroundColor: colors.BACKGROUND,
      position: 'absolute',
      top: 77,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      padding: moderateScale(20),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filter: {
      fontSize: FONTSIZE.Text18,
      ...GlobalStyles.W600,
    },
    Block: {
      fontSize: FONTSIZE.Text14,
      ...GlobalStyles.W600,
    },
    Reset: {
      fontSize: FONTSIZE.Text12,
      ...GlobalStyles.W600,
      color: colors.RED_100,
    },
    pillText: {
      textTransform: 'uppercase',
      fontSize: FONTSIZE.Text11,
      ...GlobalStyles.W500,
      color: colors.GRAY300,
    },
    pillActive: {
      textTransform: 'uppercase',
      color: colors.WHITE,

      fontSize: FONTSIZE.Text11,

      fontSize: FONTSIZE.Text11,
      ...GlobalStyles.W500,
    },
    pillViewStyles: {
      marginVertical: 8,

      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F1F1F1',
      width: width * 0.18,
      paddingVertical: 10,
      borderRadius: 20,
    },
    blockContainer: {
      paddingVertical: 10,
    },
  });
};
