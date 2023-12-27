import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {HeaderLogo} from '../../Assets/SVG';
import {useTypedSelector} from '../../Store/MainStore';
import {selectUserProfile} from '../../Store/Slices/AuthSlice';
import {FONTFAMILY, FONTSIZE} from '../../Utils/Resource';
import CustomText from '../CustomText/CustomText';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

const MainHeader = () => {
  const {colors, dark} = useTheme();
  const styles = getStyles(colors);
  const profileDetails = useTypedSelector(selectUserProfile);

  return (
    <View style={[styles.main, GlobalStyles.shadow]}>
      <View style={styles.leftContainer}>
        <HeaderLogo />
        <CustomText viewStyles={styles.textView} style={styles.textStyles}>
          {profileDetails?.userData?.companyDomain}
        </CustomText>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          {/* <Notification dark={dark} /> */}
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Search />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default MainHeader;
const getStyles = colors => {
  return StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingVertical: 13,
      backgroundColor: colors.BACKGROUND,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '75%',
    },
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // width: '20%',
    },
    textView: {
      marginLeft: 15,
    },
    textStyles: {
      fontSize: FONTSIZE.Text15,
      letterSpacing: 0.5,
      fontWeight: '600',
      fontFamily: FONTFAMILY.PoppinsSemiBold,
    },
  });
};
