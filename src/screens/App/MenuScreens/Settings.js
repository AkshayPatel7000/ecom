import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import CustomText from '../../../components/CustomText/CustomText';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from '../../../utils/responsive';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE} from '../../../utils/Resource';
import CustomInput from '../../../components/CustomInput';
import NormalInput from '../../../components/CustomInput/NormalInput';

const Settings = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <Container>
      <BackHeader bigTitle={'Settings'} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.sections}>
          <View style={styles.passwordHeading}>
            <CustomText style={styles.heading}>Personal information</CustomText>
          </View>
          <NormalInput placeHolder={'Matilda Brown'} editable={false} />
          <NormalInput placeHolder={'matildabrown@mail.com'} editable={false} />
        </View>
        <View style={styles.sections}>
          <View style={styles.passwordHeading}>
            <CustomText style={styles.heading}>Password</CustomText>
            <TouchableOpacity>
              <CustomText style={styles.passwordChange}>Change</CustomText>
            </TouchableOpacity>
          </View>
          <NormalInput placeHolder={'********'} editable={false} />
        </View>
        <View style={styles.sections}>
          <View style={styles.passwordHeading}>
            <CustomText style={styles.heading}>Notification</CustomText>
            <TouchableOpacity>
              <CustomText style={styles.passwordChange}>Change</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationItems}>
            <CustomText>Sales</CustomText>
            <Switch />
          </View>
          <View style={styles.notificationItems}>
            <CustomText>New arrivals</CustomText>
            <Switch />
          </View>
          <View style={styles.notificationItems}>
            <CustomText>Delivery status changes</CustomText>
            <Switch />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: moderateScale(20),
      marginVertical: moderateScale(20),
    },
    heading: {
      ...GlobalStyles.w400,
      fontSize: FONTSIZE.Text16,
    },
    passwordHeading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    passwordChange: {
      ...GlobalStyles.w500,
      fontSize: FONTSIZE.Text14,
      color: colors.border,
    },
    sections: {
      paddingVertical: 10,
    },
    notificationItems: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
  });
};
