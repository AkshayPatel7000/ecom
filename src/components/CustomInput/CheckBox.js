import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Check, Uncheck} from '../../assets/SVG';
import CustomText from '../CustomText/CustomText';
import {FONTSIZE} from '../../utils/Resource';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import {useTheme} from '@react-navigation/native';

const Checkbox = ({label, isChecked, onPress}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {!isChecked ? <Uncheck /> : <Check />}
      <CustomText style={styles.label}>{label}</CustomText>
    </TouchableOpacity>
  );
};
const getStyles = colors => {
  return StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: 'gray',
      marginRight: 8,
    },
    checked: {
      backgroundColor: 'blue', // Change the background color when checked
    },
    label: {
      fontSize: FONTSIZE.Text14,
      marginLeft: 10,
      ...GlobalStyles.W400,
      color: colors.GRAY100,
    },
  });
};
export default Checkbox;
