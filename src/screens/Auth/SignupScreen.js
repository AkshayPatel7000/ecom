import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomText from '../../components/CustomText/CustomText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import {FONTFAMILY, FONTSIZE, RoutesName, Strings} from '../../utils/Resource';
import {AuthSVG, EmailSVG, KeySvg} from '../../assets/SVG';
import Container from '../../components/Container';
import StringsConstants from '../../utils/constants/Strings';
import {signUp} from '../../Services/AuthServices/AuthServices';

const SignupScreen = () => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
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
  const moveTo = route => {
    navigation.navigate(route);
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
      if (!Strings.validatePasswordSpecial(password)) {
        return updateState({
          passwordHasError: true,
          passwordErrorMsg:
            StringsConstants.minimumFieldError('Password', 6) +
            ' & includes one Special character.',
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
      await signUp(body);
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
          <View style={styles.svgContainer}>{/* <AuthSVG /> */}</View>

          <CustomText style={styles.heading}>Let’s you in </CustomText>
          <View style={styles.buttonContainer}>
            <View style={{width: '100%', marginTop: moderateScale(15)}}>
              <CustomInput
                title="First Name"
                leftIcon={<EmailSVG dark={dark} />}
                setValue={e => updateState({firstName: e})}
                value={firstName}
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
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomText}>
        <CustomText>Already have an account.</CustomText>
        <TouchableOpacity
          style={styles.bottomSignUp}
          onPress={() => moveTo(RoutesName.LOGIN)}>
          <CustomText style={styles.forgotText}>Login</CustomText>
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
    bottomSignUp: {
      marginLeft: 10,
    },
  });
};
