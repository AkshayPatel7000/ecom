import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {FONTSIZE, width} from '../../utils/Resource';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import CustomText from '../CustomText/CustomText';
import {useTheme} from '@react-navigation/native';
import {isEmptyImage} from '../../utils/helperFunction';

const ProductCard = ({item, onPress}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={isEmptyImage(item.imageUrl)}
          style={styles.imageStyles}
        />
        {item.discountPersent > 0 && (
          <View style={styles.discountStyles}>
            <CustomText style={styles.discountText}>
              {item.discountPersent?.toFixed(2)}%
            </CustomText>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <CustomText style={styles.typeStyles}>
          {item?.category?.name}
        </CustomText>
        <CustomText style={styles.nameStyles} numberOfLines={3}>
          {item?.title}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomText style={[styles.amunt, {fontSize: FONTSIZE.Text12}]}>
              MRP:{' '}
            </CustomText>
            <CustomText
              style={[
                styles.amunt,
                {fontSize: FONTSIZE.Text12, textDecorationLine: 'line-through'},
              ]}>
              ₹{item.price}
            </CustomText>
          </View>
          <CustomText style={[styles.amunt, styles.qty]}>
            ₹ {item.discountedPrice?.toFixed(2)}
          </CustomText>
          {/* <CustomText style={[styles.amunt, styles.qty]}>100Kg</CustomText> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
const getStyles = colors => {
  return StyleSheet.create({
    main: {
      width: width * 0.42,
      height: 350,
      borderRadius: 8,
      ...GlobalStyles.shadow,
      backgroundColor: colors.BACKGROUND,
      shadowColor: colors.GRAY100,
      justifyContent: 'space-between',
    },
    imageContainer: {width: '100%', height: '60%'},
    imageStyles: {width: '100%', height: '100%', borderRadius: 10},
    discountStyles: {
      position: 'absolute',
      width: 50,
      backgroundColor: colors.RED_200,
      borderRadius: 50,
      left: 10,
      top: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
    },
    discountText: {
      fontSize: FONTSIZE.Text11,
      ...GlobalStyles.w400,
      color: colors.WHITE,
    },
    textContainer: {
      padding: 10,
      height: '40%',
      justifyContent: 'space-between',
    },
    typeStyles: {
      fontSize: FONTSIZE.Text11,
      ...GlobalStyles.w400,
      color: colors.GRAY100,
    },
    nameStyles: {
      fontSize: FONTSIZE.Text16,
      ...GlobalStyles.w400,
    },
    amunt: {
      fontSize: FONTSIZE.Text14,
      ...GlobalStyles.w500,
      color: colors.GRAY100,
    },
    qty: {
      color: colors.PRIMARY_GREEN,
    },
  });
};
