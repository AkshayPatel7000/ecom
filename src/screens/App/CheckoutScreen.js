import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import BackHeader from '../../components/Headers/BackHeader';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import CustomText from '../../components/CustomText/CustomText';
import GlobalStyles from '../../components/GlobalStyles/GlobalStyles';
import {
  FONTSIZE,
  LocalStorage,
  RoutesName,
  Strings,
} from '../../utils/Resource';
import CustomButton from '../../components/CustomButton';
import RazorpayCheckout from 'react-native-razorpay';
import {useTypedSelector} from '../../Store/MainStore';
import {selectUserProfile} from '../../Store/Slices/AuthSlice';
import CustomInput from '../../components/CustomInput';
import {selectCartItems} from '../../Store/Slices/CartSlice';
import {createOrder} from '../../Services/AppServices/ShopService';
import {showError, showSuccess} from '../../utils/helperFunction';
import {VerifyOrder} from '../../Services/AppServices/CartServices';
import {getUserProfile} from '../../Services/AuthServices/AuthServices';
const CheckoutScreen = props => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {navigate} = useNavigation();
  const cart = useTypedSelector(selectCartItems);
  const userData = useTypedSelector(selectUserProfile);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const getAddress = async () => {
        const data = await LocalStorage.getAsyncData('DEFAULT_ADDRESS');

        if (data) {
          const UserAddress = data;
          if (UserAddress) {
            updateState({
              firstName: UserAddress.firstName,
              lastName: UserAddress.lastName,
              phone: UserAddress.mobile,
              city: UserAddress.city,
              stateRegion: UserAddress.state,
              address: UserAddress.streetAddress,
              zip: UserAddress.zipCode,
              _id: UserAddress._id,
            });
          }
        }
        console.log(
          '🛺 ~ file: ShippingAddress.js:22 ~ useEffect ~ data:',
          data,
        );
      };
      getAddress();
    }, [props]),
  );

  const [state, setState] = useState({
    firstName: '',
    firstNameHasError: false,
    firstNameErrorMsg: '',
    lastName: '',
    lastNameHasError: false,
    lastNameErrorMsg: '',
    phone: '',
    phoneHasError: false,
    phoneErrorMsg: '',
    address: '',
    addressHasError: false,
    addressErrorMsg: '',
    city: '',
    cityHasError: false,
    cityErrorMsg: '',
    stateRegion: '',
    stateRegionHasError: false,
    stateRegionErrorMsg: '',
    zip: '',
    zipHasError: false,
    zipErrorMsg: '',
    _id: '',
  });
  const {
    firstName,
    firstNameHasError,
    firstNameErrorMsg,
    lastName,
    lastNameHasError,
    lastNameErrorMsg,
    phone,
    phoneHasError,
    phoneErrorMsg,
    address,
    addressHasError,
    addressErrorMsg,
    city,
    cityHasError,
    cityErrorMsg,
    stateRegion,
    stateRegionHasError,
    stateRegionErrorMsg,
    zip,
    zipHasError,
    zipErrorMsg,
    _id,
  } = state;
  const updateState = value => {
    setState({...state, ...value});
  };

  const checkValidation = input => {
    if (input === 'firstName') {
      if (!Strings.validateName(firstName) || firstName?.trim() === '') {
        return updateState({
          firstNameHasError: true,
          firstNameErrorMsg: 'Enter a valid full name.',
        });
      } else {
        return updateState({
          firstNameHasError: false,
          firstNameErrorMsg: '',
        });
      }
    }
    if (input === 'lastName') {
      if (!Strings.validateName(lastName) || lastName?.trim() === '') {
        return updateState({
          lastNameHasError: true,
          lastNameErrorMsg: 'Enter a valid last name.',
        });
      } else {
        return updateState({
          lastNameHasError: false,
          lastNameErrorMsg: '',
        });
      }
    }
    if (input === 'phone') {
      if (!Strings.validateMobileNumber(phone) || phone.trim() === '') {
        return updateState({
          phoneHasError: true,
          phoneErrorMsg: 'Phone is required.',
        });
      } else {
        return updateState({
          phoneHasError: false,
          phoneErrorMsg: '',
        });
      }
    }
    if (input === 'address') {
      if (address.trim() === '') {
        return updateState({
          addressHasError: true,
          addressErrorMsg: 'Address is required.',
        });
      } else {
        return updateState({
          addressHasError: false,
          addressErrorMsg: '',
        });
      }
    }
    if (input === 'city') {
      if (city?.trim() === '') {
        return updateState({
          cityHasError: true,
          cityErrorMsg: 'Enter a valid city.',
        });
      } else {
        return updateState({
          cityHasError: false,
          cityErrorMsg: '',
        });
      }
    }
    if (input === 'stateRegion') {
      if (stateRegion.trim() === '') {
        return updateState({
          stateRegionHasError: true,
          stateRegionErrorMsg: 'State is required.',
        });
      } else {
        return updateState({
          stateRegionHasError: false,
          stateRegionErrorMsg: '',
        });
      }
    }
    if (input === 'zip') {
      if (zip.trim() === '') {
        return updateState({
          zipHasError: true,
          zipErrorMsg: 'zip is required.',
        });
      } else {
        return updateState({
          zipHasError: false,
          zipErrorMsg: '',
        });
      }
    }
  };
  const onOrderPlace = orderBody => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_V58aNPoa7wSiXe', // Your api key
      amount: cart.totalDiscountedPrice * 100,
      name: 'foo',
      prefill: {
        email: userData.email,
        contact: phone,
        name: `${userData.firstName} ${userData.lastName}`,
      },
      theme: {color: '#38CCAA'},
    };
    console.log('🚀 ~ cart:', options);

    RazorpayCheckout.open(options)
      .then(async data => {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} =
          data;
        const orderData = await createOrder(orderBody);
        console.log('🚀 ~ orderData:', orderData);
        if (orderData.error) {
          return showError('Please select a valid address');
        }
        await VerifyOrder(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          orderData,
        );

        navigate(RoutesName.HOME);
        showSuccess('Order Placed Successfully!');
      })
      .catch(error => {
        showError(error?.error?.description, 5000);

        // handle failure
      });
  };

  const CreateNewOrder = async () => {
    try {
      let errorState = [
        firstNameHasError,
        lastNameHasError,
        phoneHasError,
        addressHasError,
        cityHasError,
        stateRegionHasError,
        zipHasError,
      ];
      if (errorState.find(ele => ele)) {
        return showError('All Fields are required');
      }
      const ordersBody = {
        firstName,
        lastName,
        streetAddress: address,
        city,
        state: stateRegion,
        zipCode: zip,
        mobile: phone,
        user: userData._id,
        _id,
      };

      if (_id === '') {
        delete ordersBody._id;
      }
      if (address.trim() == '') {
        return showError('Please select a valid address');
      }
      onOrderPlace(ordersBody);
    } catch (error) {
      console.log(
        '🛺 ~ file: CheckoutScreen.js:255 ~ CreateNewOrder ~ error:',
        error,
      );
    }
  };
  return (
    <Container>
      <BackHeader Title="Checkout" />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {useDefaultAddress && (
          <View>
            <CustomText style={styles.H1}>Shipping address</CustomText>
            <View style={styles.addressCard}>
              <View style={styles.nameAndChange}>
                <CustomText
                  style={styles.H2}>{`${firstName} ${lastName}`}</CustomText>
                <TouchableOpacity
                  onPress={() => navigate(RoutesName.SHIPPING_ADDRESS)}>
                  <CustomText
                    style={[styles.H2, {color: colors.PRIMARY_GREEN}]}>
                    Change
                  </CustomText>
                </TouchableOpacity>
              </View>
              <CustomText style={styles.H3} numberOfLines={3}>
                {`${address}, ${city}, ${stateRegion}, ${zip} `}
              </CustomText>
            </View>
          </View>
        )}
        <View style={{alignItems: 'flex-end', marginBottom: 10}}>
          <TouchableOpacity
            onPress={() => setUseDefaultAddress(!useDefaultAddress)}>
            <CustomText style={[styles.H2, {color: colors.PRIMARY_GREEN}]}>
              {useDefaultAddress ? 'Use New Address' : 'Use Default Address'}
            </CustomText>
          </TouchableOpacity>
        </View>

        {!useDefaultAddress && (
          <View style={styles.AddressContainer}>
            <View>
              <CustomInput
                title="First Name"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('firstName')}
                hasError={firstNameHasError}
                errorMsg={firstNameErrorMsg}
                value={firstName}
                setValue={e => updateState({firstName: e, _id: ''})}
              />
              <CustomInput
                title="Last Name"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('lastName')}
                hasError={lastNameHasError}
                errorMsg={lastNameErrorMsg}
                value={lastName}
                setValue={e => updateState({lastName: e, _id: ''})}
              />
              <CustomInput
                title="Phone"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('phone')}
                hasError={phoneHasError}
                errorMsg={phoneErrorMsg}
                value={phone}
                setValue={e => updateState({phone: e, _id: ''})}
              />
              <CustomInput
                title="Address"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('address')}
                hasError={addressHasError}
                errorMsg={addressErrorMsg}
                value={address}
                setValue={e => updateState({address: e, _id: ''})}
              />
              <CustomInput
                title="City"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('city')}
                hasError={cityHasError}
                errorMsg={cityErrorMsg}
                value={city}
                setValue={e => updateState({city: e, _id: ''})}
              />
              <CustomInput
                title="State/Province/Region"
                placeholder=""
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('stateRegion')}
                hasError={stateRegionHasError}
                errorMsg={stateRegionErrorMsg}
                value={stateRegion}
                setValue={e => updateState({stateRegion: e, _id: ''})}
              />
              <CustomInput
                title="Zip Code (Postal Code)"
                placeholder=""
                keyboardType={'number-pad'}
                containerStyle={styles.inputStyles}
                onBlur={() => checkValidation('zip')}
                hasError={zipHasError}
                errorMsg={zipErrorMsg}
                value={zip}
                setValue={e => updateState({zip: e, _id: ''})}
              />
            </View>
          </View>
        )}
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
              Total amount:
            </CustomText>
            <CustomText style={styles.H0}>₹ {cart.totalPrice}</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
              Discount:
            </CustomText>
            <CustomText style={styles.H0}>₹ {cart.discounte}</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
              Total Items:
            </CustomText>
            <CustomText style={styles.H0}>{cart.totalItem}</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
              Amount To Pay:
            </CustomText>
            <CustomText style={styles.H0}>
              ₹ {cart.totalDiscountedPrice}
            </CustomText>
          </View>
          <CustomButton title="PLACE ORDER" onPress={CreateNewOrder} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default CheckoutScreen;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      // flex: 1,
      justifyContent: 'space-between',
    },
    H0: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text18,
    },
    H1: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text16,
    },
    H2: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text14,
    },
    H3: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
      color: colors.lightBlack,
      lineHeight: 21,
    },
    addressCard: {
      backgroundColor: colors.BACKGROUND,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,

      borderRadius: 8,
      marginVertical: 20,
      padding: 25,
    },
    nameAndChange: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    AddressContainer: {
      ...GlobalStyles.shadow,
      backgroundColor: colors.BACKGROUND,
      shadowColor: colors.GRAY100,
      padding: 20,
      borderRadius: 10,
    },
  });
};
