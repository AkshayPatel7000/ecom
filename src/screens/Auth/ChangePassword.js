import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Container from '../../components/Container';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAppDispatch, useTypedSelector} from '../../Store/MainStore';
import {selectAppLogo, setForgotEmail} from '../../Store/Slices/AuthSlice';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import {
  FONTFAMILY,
  FONTSIZE,
  RoutesName,
  Strings,
  width,
} from '../../utils/Resource';
import CustomText from '../../components/CustomText/CustomText';
import {EmailSVG, KeySvg, PhoneSvg} from '../../assets/SVG';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import StringsConstants from '../../utils/constants/Strings';
import {
  changePasswordApi,
  sendOtp,
} from '../../Services/AuthServices/AuthServices';
import {useDispatch} from 'react-redux';
import { showError } from '../../utils/helperFunction';

const ChangePassword = () => {
  const {colors, dark} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = getStyles(colors);
  const {appLogo, companyName, forgotEmail} = useTypedSelector(selectAppLogo);
  const [state, setState] = useState({
    otp: '',
    otpHasError: false,
    otpErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
  });
  const {
    otp,
    otpHasError,
    otpErrorMsg,
    password,
    passwordErrorMsg,
    passwordHasError,
  } = state;

  const updateState = value => {
    setState({...state, ...value});
  };

  const checkValidation = input => {
    if (input === 'otp') {
      if (otp.length < 4) {
        return updateState({
          emailHasError: true,
          emailErrorMsg: 'OTP should be 4 digits',
        });
      } else {
        return updateState({
          emailHasError: false,
          emailErrorMsg: '',
        });
      }
    }
    if (input === 'password') {
      if (password.length <= 5) {
        return updateState({
          passwordHasError: true,
          passwordErrorMsg: 'Password should be 6 char long',
        });
      } else {
        return updateState({
          passwordHasError: false,
          passwordErrorMsg: '',
        });
      }
    }
  };

  const onChangePassword = async () => {
    let error = {
      otpHasError: false,
      otpErrorMsg: '',
      passwordErrorMsg,
      passwordHasError,
    };
    otp.trim() === '' &&
      ((error.otpHasError = true),
      (error.otpErrorMsg = StringsConstants.requiredFieldError('OTP')));

    otp.length !== 4 &&
      ((error.otpHasError = true),
      (error.otpErrorMsg = 'OTP must have 4 digits.'));

    password.trim() === '' &&
      ((error.passwordHasError = true),
      (error.passwordErrorMsg =
        StringsConstants.requiredFieldError('New Password')));

    password.length <= 5 &&
      ((error.passwordHasError = true),
      (error.passwordErrorMsg = StringsConstants.minimumFieldError(
        'New Password',
        5,
      )));

    if (!error.otpHasError && !error.passwordHasError) {
      let body = {
        email: forgotEmail?.toLowerCase(),
        otp: Number(otp),
        password: password,
      };
      const data = await changePasswordApi(body);
      if (data.success) {
        dispatch(setForgotEmail(''));
        navigation.navigate(RoutesName.LOGIN);
      }else{
        showError(data?.message);
      }
    } else {
      updateState(error);
    }
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.svgContainer}>
            {appLogo && (
              <View
                style={{
                  height: 200,
                  width: width * 0.8,
                }}>
                <Image
                  source={{uri: appLogo}}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
          </View>
          <CustomText style={styles.heading}>{'Change Password'}</CustomText>
          <CustomText>
            {`OTP has been sent to your email ${forgotEmail}`}
          </CustomText>
          <View style={styles.buttonContainer}>
            <View style={{width: '100%', marginTop: moderateScale(15)}}>
              <CustomInput
                title="OTP"
                leftIcon={<KeySvg dark={dark} />}
                setValue={e => updateState({otp: e})}
                keyboardType={'numeric'}
                placeholder="eg: 1234"
                value={otp}
                containerStyle={styles.email}
                hasError={otpHasError}
                errorMsg={otpErrorMsg}
                onBlur={() => checkValidation('otp')}
              />
              <CustomInput
                title="New Password"
                leftIcon={<KeySvg dark={dark} />}
                setValue={e => updateState({password: e})}
                value={password}
                containerStyle={styles.email}
                hasError={passwordHasError}
                errorMsg={passwordErrorMsg}
                onBlur={() => checkValidation('password')}
              />
            </View>

            <CustomButton
              onPress={() => {
                onChangePassword();
              }}
              title="Change Password"
              containerStyles={styles.social}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default ChangePassword;

const getStyles = colors => {
  return StyleSheet.create({
    main: {
      alignItems: 'center',
      flex: 1,
    },
    svgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(36),
      marginTop: '2%',
    },
    heading: {
      fontSize: FONTSIZE.Text32,
      fontWeight: '600',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
      marginTop: -20,
    },
    buttonContainer: {
      width: '90%',
      marginVertical: moderateVerticalScale(20),
    },
    social: {
      marginVertical: moderateVerticalScale(25),
    },
  });
};
