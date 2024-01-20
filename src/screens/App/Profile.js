import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText/CustomText';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import GlobalStyles from '../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE, Strings} from '../../utils/Resource';

import ProfileImage from '../../components/Avatar/ProfileImage';
import ProfileMenuItem from '../../components/ProfileMenuItem';
import BackHeader from '../../components/Headers/BackHeader';
import {useTypedSelector} from '../../Store/MainStore';
import {selectUserProfile} from '../../Store/Slices/AuthSlice';
import {
  getMyOrders,
  getUserProfile,
  updateUser,
} from '../../Services/AuthServices/AuthServices';
import {Modalize} from 'react-native-modalize';
import CustomInput from '../../components/CustomInput';
import {EmailSVG, PhoneSvg, ProfileSVG, UserSVG} from '../../assets/SVG';
import {moderateScale, moderateVerticalScale} from '../../utils/responsive';
import CustomButton from '../../components/CustomButton';
import {Portal} from 'react-native-portalize';
import StringsConstants from '../../utils/constants/Strings';

const Profile = props => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const modalizeRef = useRef();
  const [state, setState] = useState({
    firstNameUpdate: '',
    firstNameHasError: false,
    firstNameErrorMsg: '',
    lastNameUpdate: '',
    lastNameHasError: false,
    lastNameErrorMsg: '',
    mobileUpdate: '',
    mobileHasError: false,
    mobileErrorMsg: '',
  });
  const {
    firstNameUpdate,
    firstNameHasError,
    firstNameErrorMsg,
    lastNameUpdate,
    lastNameHasError,
    lastNameErrorMsg,
    mobileUpdate,
    mobileHasError,
    mobileErrorMsg,
  } = state;
  const {firstName, lastName, email, mobile} =
    useTypedSelector(selectUserProfile);
  const updateState = value => {
    setState({...state, ...value});
  };
  const checkValidation = input => {
    if (input === 'firstNameUpdate') {
      if (!Strings.validateName(firstNameUpdate)) {
        return updateState({
          firstNameHasError: true,
          firstNameErrorMsg: 'Enter a valid first name.',
        });
      } else if (firstNameUpdate.trim() === '') {
        return updateState({
          firstNameHasError: true,
          firstNameErrorMsg: 'Required first name.',
        });
      } else {
        return updateState({
          firstNameHasError: false,
          firstNameErrorMsg: '',
        });
      }
    }
    if (input === 'lastNameUpdate') {
      if (!Strings.validateName(lastNameUpdate)) {
        return updateState({
          lastNameHasError: true,
          lastNameErrorMsg: 'Enter a valid last name.',
        });
      } else if (lastNameUpdate.trim() === '') {
        return updateState({
          lastNameHasError: true,
          lastNameErrorMsg: 'Required last name.',
        });
      } else {
        return updateState({
          lastNameHasError: false,
          lastNameErrorMsg: '',
        });
      }
    }
    if (input === 'mobileUpdate') {
      if (!Strings.validateMobileNumber(mobileUpdate)) {
        return updateState({
          mobileHasError: true,
          mobileErrorMsg: 'Enter a valid mobile number.',
        });
      } else if (mobileUpdate.trim() === '') {
        return updateState({
          mobileHasError: true,
          mobileErrorMsg: 'Required mobile.',
        });
      } else {
        return updateState({
          mobileHasError: false,
          mobileErrorMsg: '',
        });
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserProfile();
      updateState({
        firstNameUpdate: firstName,
        lastNameUpdate: lastName,
        mobileUpdate: mobile,
      });
    }, [props]),
  );
  // useEffect(() => {
  //   getUserProfile();
  //   // getMyOrders();
  // }, []);
  const open = () => {
    modalizeRef.current.open();
  };
  const onSignInPress = async () => {
    let error = {
      mobileHasError: false,
      mobileErrorMsg: '',
      emailHasError: false,
      emailErrorMsg: '',
      firstNameHasError: false,
      firstNameErrorMsg: '',
      lastNameHasError: false,
      lastNameErrorMsg: '',
    };

    mobileUpdate.trim() === '' &&
      ((error.mobileHasError = true),
      (error.mobileErrorMsg = StringsConstants.requiredFieldError('Mobile')));
    Strings.validateMobileNumber(mobileUpdate) &&
      ((error.mobileHasError = true),
      (error.mobileErrorMsg = 'Enter a valid mobile number.'));
    lastNameUpdate.trim() === '' &&
      ((error.lastNameHasError = true),
      (error.lastNameErrorMsg =
        StringsConstants.requiredFieldError('Last name')));
    firstNameUpdate.trim() === '' &&
      ((error.firstNameHasError = true),
      (error.firstNameErrorMsg =
        StringsConstants.requiredFieldError('First name')));

    if (
      firstNameUpdate.trim() !== '' &&
      lastNameUpdate.trim() !== '' &&
      mobileUpdate.trim() !== ''
    ) {
      let body = {
        firstName: firstNameUpdate,
        lastName: lastNameUpdate,
        mobile: mobileUpdate,
      };
      const data = await updateUser(body);
      if (data) {
        modalizeRef.current.close();
      }
    } else {
      updateState(error);
    }
  };
  return (
    <Container>
      <BackHeader showBack={false} bigTitle={'My Profile'} />
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <View style={styles.mainProfile}>
            <ProfileImage />
            <View style={styles.userDetails}>
              <CustomText style={styles.userName}>
                {firstName + ' ' + lastName}
              </CustomText>
              <CustomText style={styles.email}>{email}</CustomText>

              <TouchableOpacity
                onPress={open}
                style={{
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  paddingVertical: 5,
                  borderColor: colors.PRIMARY_GREEN,
                  borderRadius: 50,
                  width: '30%',
                  marginTop: 10,
                }}>
                <CustomText>EDIT</CustomText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <ProfileMenuItem />
        </View>
      </ScrollView>
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          onClosed={() => {
            updateState({
              firstNameUpdate: firstName,
              lastNameUpdate: lastName,
              mobileUpdate: mobile,

              firstNameHasError: false,
              firstNameErrorMsg: '',

              lastNameHasError: false,
              lastNameErrorMsg: '',

              mobileHasError: false,
              mobileErrorMsg: '',
            });
          }}>
          <View>
            <View style={styles.buttonContainer}>
              <CustomText style={styles.heading}>Update Profile</CustomText>
              <View style={{width: '100%', marginTop: moderateScale(15)}}>
                <CustomInput
                  title="First Name"
                  placeholder=""
                  leftIcon={<UserSVG dark={dark} />}
                  setValue={e => updateState({firstNameUpdate: e})}
                  value={firstNameUpdate}
                  containerStyle={styles.email}
                  hasError={firstNameHasError}
                  errorMsg={firstNameErrorMsg}
                  onBlur={() => checkValidation('firstNameUpdate')}
                />
                <CustomInput
                  title="Last Name"
                  placeholder=""
                  leftIcon={<UserSVG dark={dark} />}
                  setValue={e => updateState({lastNameUpdate: e})}
                  value={lastNameUpdate}
                  containerStyle={styles.email}
                  hasError={lastNameHasError}
                  errorMsg={lastNameErrorMsg}
                  onBlur={() => checkValidation('lastNameUpdate')}
                />

                <CustomInput
                  leftIcon={<PhoneSvg dark={dark} />}
                  placeholder="9876543210"
                  title="Mobile"
                  value={mobileUpdate}
                  setValue={e => updateState({mobileUpdate: e})}
                  hasError={mobileHasError}
                  errorMsg={mobileErrorMsg}
                  onBlur={() => checkValidation('mobileUpdate')}
                  keyboardType={'snumber-pad'}
                />
                <CustomInput
                  title="email"
                  leftIcon={<EmailSVG dark={dark} />}
                  setValue={e => updateState({email: e})}
                  placeholder={email}
                  containerStyle={styles.email}
                  editable={false}
                />
              </View>

              <CustomButton
                onPress={onSignInPress}
                title="Update"
                containerStyles={styles.social}
              />
            </View>
          </View>
        </Modalize>
      </Portal>
    </Container>
  );
};

export default Profile;

const getStyles = colors =>
  StyleSheet.create({
    main: {},
    contentContainerStyle: {
      paddingHorizontal: 15,
    },
    heading: {
      ...GlobalStyles.W700,
      fontSize: FONTSIZE.Text24,
    },
    mainProfile: {
      flexDirection: 'row',
      //   height: 100,
      marginTop: 50,
    },
    userDetails: {
      marginLeft: 15,
      paddingVertical: 5,
      flex: 1,
    },
    userName: {
      ...GlobalStyles.W700,
      fontSize: FONTSIZE.Text18,
      lineHeight: 28,
    },
    email: {
      ...GlobalStyles.W600,
      fontSize: FONTSIZE.Text12,
      color: colors.GRAY300,
    },
    editButton: {
      borderColor: colors.PRIMARY_GREEN,
      borderWidth: 1,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    editText: {
      ...GlobalStyles.W600,
      fontSize: FONTSIZE.Text12,
      color: colors.PRIMARY_GREEN,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    divider: {
      marginTop: 30,
      backgroundColor: colors.INPUT_BORDER,
      height: 5,
    },
    social: {
      marginVertical: moderateVerticalScale(5),
      marginTop: 30,
    },
    buttonContainer: {
      // width: '90%',
      paddingTop: 20,
      marginHorizontal: 20,
      marginBottom: moderateVerticalScale(50),
      justifyContent: 'center',
    },
  });
