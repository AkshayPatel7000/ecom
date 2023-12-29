import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  AboutSVG,
  FAQSVG,
  FeedBackSVG,
  LogoutSVG,
  PaymentSVG,
  PrivacySVG,
  RightArrowSVG,
} from '../assets/SVG';
import {FONTSIZE, LocalStorage, RoutesName} from '../utils/Resource';

import {useAppDispatch} from '../Store/MainStore';
import {resetAuthSlice, setAuthToken} from '../Store/Slices/AuthSlice';
import CustomText from './CustomText/CustomText';
import GlobalStyles from './GlobalStyles/GlobalStyles';
import {setCartItems} from '../Store/Slices/CartSlice';
import {resetShopSlice} from '../Store/Slices/ShopSlice';

const ProfileMenuItem = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const moveTo = screen => {
    navigation.navigate(screen);
  };
  const onLogOutPress = () => {
    LocalStorage.LocalStorageLogOut();
    dispatch(resetAuthSlice());
    dispatch(setAuthToken(null));
    dispatch(setCartItems({}));
    dispatch(resetShopSlice({}));
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveTo(RoutesName.MY_ORDERS)}>
        <View>
          <CustomText style={styles.title}>My Orders</CustomText>
          <CustomText style={styles.subTitle}>View your all orders</CustomText>
        </View>
        <RightArrowSVG />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveTo(RoutesName.SHIPPING_ADDRESS)}>
        <View>
          <CustomText style={styles.title}>Shipping addresses</CustomText>
          <CustomText style={styles.subTitle}>
            View your saved addresses
          </CustomText>
        </View>
        <RightArrowSVG />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => moveTo(RoutesName.PAYMENT_MODE)}>
        <View>
          <CustomText style={styles.title}>Payment methods</CustomText>
          <CustomText style={styles.subTitle}>
            View your saved Payment methods
          </CustomText>
        </View>
        <RightArrowSVG />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => moveTo(RoutesName.SETTINGS)}>
        <View>
          <CustomText style={styles.title}>Settings</CustomText>
          <CustomText style={styles.subTitle}>
            Notifications, password
          </CustomText>
        </View>
        <RightArrowSVG />
      </TouchableOpacity>
      {/* <View style={styles.button}>
        <View >
          <DarkSVG />
          <CustomText style={styles.title}>Dark Mode</CustomText>
        </View>
        <Switch
          barHeight={26}
          switchWidth={22}
          switchHeight={22}
          switchWidthMultiplier={2.2}
          switchLeftPx={2}
          switchRightPx={2}
          value={theme}
          onValueChange={toggleTheme}
          backgroundActive={colors.PRIMARY_GREEN}
          backgroundInActive={colors.lightBlack}
        />
      </View> */}
      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={() => onLogOutPress()}>
        <View style={styles.button}>
          <LogoutSVG />
          <CustomText
            style={[styles.title, {color: colors.RED_DARK, marginLeft: 10}]}>
            Logout
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMenuItem;

const getStyles = colors => {
  return StyleSheet.create({
    main: {
      paddingHorizontal: 16,
      marginVertical: 40,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      marginBottom: 10,
    },
    title: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
    },
    subTitle: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text11,
      color: colors.border,
    },
    logout: {
      marginTop: 35,
    },
  });
};
