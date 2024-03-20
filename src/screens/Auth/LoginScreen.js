import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthSVG, EmailSVG, KeySvg} from '../../assets/SVG';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText/CustomText';
import {
  COLOR,
  FONTFAMILY,
  FONTSIZE,
  RoutesName,
  Strings,
  width,
} from '../../utils/Resource';
import StringsConstants from '../../utils/constants/Strings';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import {login} from '../../Services/AuthServices/AuthServices';
import * as Keychain from 'react-native-keychain';
import {useTypedSelector} from '../../Store/MainStore';
import {selectAppLogo} from '../../Store/Slices/AuthSlice';
const LoginScreen = () => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const {appLogo, companyName} = useTypedSelector(selectAppLogo);

  const [state, setState] = useState({
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
  });

  const {
    email,
    emailHasError,
    emailErrorMsg,
    password,
    passwordHasError,
    passwordErrorMsg,
  } = state;
  const navigation = useNavigation();
  const moveTo = route => {
    navigation.navigate(route);
  };

  const updateState = value => {
    setState({...state, ...value});
  };
  useEffect(() => {
    const init = async () => {
      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          updateState({
            email: credentials.username,
            password: credentials.password,
          });
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
      // await Keychain.resetGenericPassword();
    };
    init();
  }, []);
  const checkValidation = input => {
    if (input === 'email') {
      if (!Strings.validateEmail(email)) {
        return updateState({
          emailHasError: true,
          emailErrorMsg: 'Enter a valid email.',
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

  const onSignInPress = async () => {
    let error = {
      passwordHasError: false,
      passwordErrorMsg: '',
      emailHasError: false,
      emailErrorMsg: '',
    };

    if (password.length <= 5) {
      error.passwordHasError = true;
      error.passwordErrorMsg = 'Password too short, Min 6 char';
    }
    if (password.trim() === '') {
      error.passwordHasError = true;
      error.passwordErrorMsg = StringsConstants.requiredFieldError('Password');
    }

    email.trim() === '' &&
      ((error.emailHasError = true),
      (error.emailErrorMsg = StringsConstants.requiredFieldError('Email')));

    if (!error.emailHasError && !error.passwordHasError) {
      let body = {
        email: email?.toLowerCase(),
        password,
      };
      const data = await login(body);
      if (data) {
        await Keychain.setGenericPassword(body.email, body.password);
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
            {/* <AuthSVG /> */}
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

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <CustomText style={styles.heading}>
              {companyName || 'Raghunandan Rice Traders'}
            </CustomText>
          </View>
          <Text style={styles.addressText}>
            {
              'J-31, Dandbunder, MAFCO Rd, APMC Market 2, Phase 2, Sector 19B, Vashi, Navi Mumbai, Maharashtra 400705'
            }
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text style={styles.addressText}>{'09819430492'}</Text> */}
            <TouchableOpacity
              style={{marginLeft: 15}}
              onPress={() => {
                Linking.openURL('https://maps.app.goo.gl/6VUjevPMSF8EKFmh7');
              }}>
              <Ionicons
                name="location"
                size={32}
                color={COLOR.GRADIENT_GREEN_100}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <View style={{width: '100%', marginTop: moderateScale(15)}}>
              <CustomInput
                title="email"
                leftIcon={<EmailSVG dark={dark} />}
                setValue={e => updateState({email: e})}
                value={email}
                containerStyle={styles.email}
                hasError={emailHasError}
                errorMsg={emailErrorMsg}
                onBlur={() => checkValidation('email')}
              />
              <CustomInput
                leftIcon={<KeySvg dark={dark} />}
                placeholder="*********"
                title="password"
                value={password}
                setValue={e => updateState({password: e})}
                containerStyle={{marginBottom: moderateScale(8)}}
                hasError={passwordHasError}
                errorMsg={passwordErrorMsg}
                onBlur={() => checkValidation('password')}
              />
              <TouchableOpacity
                style={styles.forgotContainer}
                onPress={() => {
                  navigation.navigate(RoutesName.FORGOT);
                }}>
                <CustomText style={styles.forgotText}>
                  Forgot Password
                </CustomText>
              </TouchableOpacity>
            </View>

            <CustomButton
              onPress={onSignInPress}
              title="Login"
              containerStyles={styles.social}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomText}>
        <CustomText>Don't have an account?</CustomText>
        <TouchableOpacity
          style={styles.bottomSignUp}
          onPress={() => moveTo(RoutesName.SIGNUP)}>
          <CustomText style={styles.forgotText}>Sign up</CustomText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default LoginScreen;

const getStyles = colors => {
  return StyleSheet.create({
    main: {
      alignItems: 'center',
      flex: 1,
    },
    heading: {
      fontSize: FONTSIZE.Text32,
      fontWeight: '600',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
      marginTop: -20,
    },
    addressText: {
      fontSize: FONTSIZE.Text14,
      fontWeight: '500',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
      textAlign: 'center',
      // marginTop: -20
    },
    svgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(36),
      position: 'relative',
    },
    buttonContainer: {
      width: '90%',
      marginVertical: moderateVerticalScale(20),
    },
    social: {
      marginVertical: moderateVerticalScale(5),
    },
    loginButton: {
      // marginVertical: moderateVerticalScale(20),
    },
    forgotContainer: {
      alignSelf: 'flex-end',
      marginBottom: moderateVerticalScale(15),
    },
    forgotText: {
      fontSize: FONTSIZE.Text14,
      fontWeight: '400',
      fontFamily: FONTFAMILY.PoppinsRegular,
      color: colors.GRADIENT_GREEN_100,
    },
    email: {marginVertical: 10},
    bottomText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomSignUp: {
      marginLeft: 10,
    },
  });
};
