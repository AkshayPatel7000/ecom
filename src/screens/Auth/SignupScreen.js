import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomText from '../../components/CustomText/CustomText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import {FONTFAMILY, FONTSIZE, RoutesName, Strings, width} from '../../utils/Resource';
import {AuthSVG, EmailSVG, KeySvg} from '../../assets/SVG';
import Container from '../../components/Container';
import StringsConstants from '../../utils/constants/Strings';
import {signUp} from '../../Services/AuthServices/AuthServices';
import * as Keychain from 'react-native-keychain';
import {useTypedSelector} from '../../Store/MainStore';
import {selectAppLogo} from '../../Store/Slices/AuthSlice';

const SignupScreen = () => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const {appLogo, companyName}  = useTypedSelector(selectAppLogo);

  const [state, setState] = useState({
    firstName: '',
    firstNameHasError: false,
    firstNameErrorMsg: '',
    lastName: '',
    lastNameHasError: false,
    lastNameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
  });
  const {
    firstName,
    firstNameHasError,
    firstNameErrorMsg,
    lastName,
    lastNameHasError,
    lastNameErrorMsg,
    email,
    emailHasError,
    emailErrorMsg,
    password,
    passwordHasError,
    passwordErrorMsg,
  } = state;
  const navigation = useNavigation();
  const moveTo = (route, url) => {
    navigation.navigate(route, {url});
  };

  const updateState = value => {
    setState({...state, ...value});
  };

  const checkValidation = input => {
    if (input === 'firstName') {
      if (!Strings.validateName(firstName)) {
        return updateState({
          firstNameHasError: true,
          firstNameErrorMsg: 'Enter a valid first name.',
        });
      } else {
        return updateState({
          firstNameHasError: false,
          firstNameErrorMsg: '',
        });
      }
    }
    if (input === 'lastName') {
      if (!Strings.validateName(lastName)) {
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
      firstNameHasError: false,
      firstNameErrorMsg: '',

      lastNameHasError: false,
      lastNameErrorMsg: '',
    };
    if (password.length <= 5) {
      error.passwordHasError = true;
      error.passwordErrorMsg = 'Password too short, Min 6 char';
    }
    password.trim() === '' &&
      ((error.passwordHasError = true),
      (error.passwordErrorMsg =
        StringsConstants.requiredFieldError('Password')));

    email.trim() === '' &&
      ((error.emailHasError = true),
      (error.emailErrorMsg = StringsConstants.requiredFieldError('Email')));
    lastName.trim() === '' &&
      ((error.lastNameHasError = true),
      (error.lastNameErrorMsg =
        StringsConstants.requiredFieldError('Last name')));
    firstName.trim() === '' &&
      ((error.firstNameHasError = true),
      (error.firstNameErrorMsg =
        StringsConstants.requiredFieldError('First name')));

    if (email.trim() !== '' && password.trim() !== '') {
      let body = {
        firstName,
        lastName,
        email: email?.toLowerCase(),
        password,
      };
      const data = await signUp(body);
      if (data) {
        await Keychain.setGenericPassword(body.email, body.password);
      }
      console.log('object', data);
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
                  width: width *0.8,
                }}>
                <Image
                  source={{uri: appLogo}}
                  style={{height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 10}}
                />
              </View>
            )}
            {/* <AuthSVG /> */}
          </View>

          <CustomText style={styles.heading}>{companyName||"Raghunandan Rice Traders"}</CustomText>
          <View style={styles.buttonContainer}>
            <View style={{width: '100%', marginTop: moderateScale(15)}}>
              <CustomInput
                title="First Name"
                leftIcon={<EmailSVG dark={dark} />}
                setValue={e => updateState({firstName: e})}
                value={firstName}
                placeholder="John"
                containerStyle={styles.email}
                hasError={firstNameHasError}
                errorMsg={firstNameErrorMsg}
                onBlur={() => checkValidation('firstName')}
              />
              <CustomInput
                title="Last Name"
                leftIcon={<EmailSVG dark={dark} />}
                setValue={e => updateState({lastName: e})}
                value={lastName}
                placeholder="Deo"
                containerStyle={styles.email}
                hasError={lastNameHasError}
                errorMsg={lastNameErrorMsg}
                onBlur={() => checkValidation('lastName')}
              />
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
                hasError={passwordHasError}
                errorMsg={passwordErrorMsg}
                onBlur={() => checkValidation('password')}
              />
            </View>

            <CustomButton
              onPress={onSignInPress}
              title="Sign Up"
              containerStyles={styles.social}
            />
            <View style={styles.tandpText}>
              <CustomText>By signup you agree to our </CustomText>
              <TouchableOpacity
                style={styles.bottomSignUp}
                onPress={() =>
                  moveTo(RoutesName.WEB, StringsConstants.urls.T_AND_C)
                }>
                <CustomText style={styles.forgotText}> T&C</CustomText>
              </TouchableOpacity>
              <CustomText> and </CustomText>
              <TouchableOpacity
                style={styles.bottomSignUp}
                onPress={() =>
                  moveTo(RoutesName.WEB, StringsConstants.urls.PRIVACY_POLICY)
                }>
                <CustomText style={styles.forgotText}>
                  Privacy Policy.
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomText}>
        <CustomText>Already have an account. </CustomText>
        <TouchableOpacity
          style={styles.bottomSignUp}
          onPress={() => moveTo(RoutesName.LOGIN)}>
          <CustomText style={styles.forgotText}> Login</CustomText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SignupScreen;

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
      marginTop: -20
    },
    svgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(36),
      marginTop: '2%',
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

    forgotText: {
      fontSize: FONTSIZE.Text14,
      fontWeight: '400',
      fontFamily: FONTFAMILY.PoppinsRegular,
      color: colors.GRADIENT_GREEN_100,
    },

    bottomText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tandpText: {
      flexDirection: 'row',

      alignItems: 'center',
    },
    bottomSignUp: {
      // marginLeft: 10,
    },
  });
};
