import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText/CustomText';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import GlobalStyles from '../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE} from '../../utils/Resource';

import ProfileImage from '../../components/Avatar/ProfileImage';
import ProfileMenuItem from '../../components/ProfileMenuItem';
import BackHeader from '../../components/Headers/BackHeader';
import {useTypedSelector} from '../../Store/MainStore';
import {selectUserProfile} from '../../Store/Slices/AuthSlice';
import {
  getMyOrders,
  getUserProfile,
} from '../../Services/AuthServices/AuthServices';

const Profile = props => {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const {firstName, lastName, email} = useTypedSelector(selectUserProfile);

  useFocusEffect(
    useCallback(() => {
      getUserProfile();
    }, [props]),
  );
  // useEffect(() => {
  //   getUserProfile();
  //   // getMyOrders();
  // }, []);

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
            </View>
          </View>

          <View style={styles.divider} />

          <ProfileMenuItem />
        </View>
      </ScrollView>
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
  });
