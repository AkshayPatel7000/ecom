import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthSVG, EmailSVG, KeySvg} from '../../assets/SVG';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText/CustomText';
import {FONTFAMILY, FONTSIZE, RoutesName, Strings} from '../../utils/Resource';
import StringsConstants from '../../utils/constants/Strings';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import {login} from '../../Services/AuthServices/AuthServices';

const LoginScreen = () => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
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
      await login(body);
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
            <AuthSVG />
          </View>

          <CustomText style={styles.heading}>Let’s you in </CustomText>
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
              <TouchableOpacity style={styles.forgotContainer}>
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
      // fontFamily: FONTFAMILY.PoppinsRegular,
      fontSize: FONTSIZE.Text32,

      fontWeight: '600',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
    },
    svgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: moderateVerticalScale(36),
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
