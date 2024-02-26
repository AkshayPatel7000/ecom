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
import {EmailSVG} from '../../assets/SVG';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import StringsConstants from '../../utils/constants/Strings';
import {sendOtp} from '../../Services/AuthServices/AuthServices';
import { useDispatch } from 'react-redux';

const ForgotScreen = () => {
  const {colors, dark} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = getStyles(colors);
  const {appLogo, companyName} = useTypedSelector(selectAppLogo);
  const [state, setState] = useState({
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
  });
  const {email, emailHasError, emailErrorMsg} = state;

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
  };

  const onForgot = async () => {
    let error = {
      emailHasError: false,
      emailErrorMsg: '',
    };
    email.trim() === '' &&
      ((error.emailHasError = true),
      (error.emailErrorMsg = StringsConstants.requiredFieldError('Email')));

    if (email.trim() !== '') {
      let body = {
        email: email?.toLowerCase(),
      };
      const data = await sendOtp(body);
      if (data?.success) {
        dispatch(setForgotEmail(email?.toLowerCase()));
        console.log('object', data);
        navigation.navigate(RoutesName.CHANGE_PASSWORD);
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
                  style={{height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 10}}
                />
              </View>
            )}
          </View>
          <CustomText style={styles.heading}>
            {'Forgot Password'}
          </CustomText>
          <View style={styles.buttonContainer}>
            <View style={{width: '100%', marginTop: moderateScale(15)}}>
              <CustomInput
                title="Email"
                leftIcon={<EmailSVG dark={dark} />}
                setValue={e => updateState({email: e})}
                value={email}
                containerStyle={styles.email}
                hasError={emailHasError}
                errorMsg={emailErrorMsg}
                onBlur={() => checkValidation('email')}
              />
            </View>

            <CustomButton
              onPress={() => {
                onForgot();
              }}
              title="Send OTP"
              containerStyles={styles.social}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default ForgotScreen;

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
