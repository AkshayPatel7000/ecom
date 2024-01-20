import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import CustomText from '../../../components/CustomText/CustomText';
import {useNavigation, useTheme} from '@react-navigation/native';
import {FONTSIZE, LocalStorage, RoutesName} from '../../../utils/Resource';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import Checkbox from '../../../components/CustomInput/CheckBox';
import FAB from '../../../components/CustomButton/FAB';
import {useTypedSelector} from '../../../Store/MainStore';
import {selectUserProfile} from '../../../Store/Slices/AuthSlice';

const ShippingAddress = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {navigate} = useNavigation();
  const {addresses} = useTypedSelector(selectUserProfile);
  const [defaultAddress, setDefaultAddress] = useState({});
  useEffect(() => {
    const getAddress = async () => {
      const data = await LocalStorage.getAsyncData('DEFAULT_ADDRESS');
      if (data) {
        setDefaultAddress(data);
      }
    };
    getAddress();
  }, []);

  const _renderItem = ({item}) => {
    return (
      <View style={styles.addressCard}>
        <View style={styles.nameAndChange}>
          <CustomText style={styles.H2}>
            {item.firstName + ' ' + item.lastName}
          </CustomText>
          {/* <TouchableOpacity
            onPress={() =>
              navigate(RoutesName.ADD_EDIT_ADDRESS, {isEdit: true})
            }>
            <CustomText style={[styles.H2, {color: colors.PRIMARY_GREEN}]}>
              Edit
            </CustomText>
          </TouchableOpacity> */}
        </View>
        <CustomText style={styles.H3} numberOfLines={3}>
          {`${item.streetAddress}, ${item.city}, ${item.state}, ${item.zipCode} `}
        </CustomText>

        <Checkbox
          isChecked={item._id === defaultAddress._id}
          label={'Use as the shipping address'}
          onPress={async () => {
            setDefaultAddress(item);
            await LocalStorage.storeAsyncData('DEFAULT_ADDRESS', item);
          }}
        />
      </View>
    );
  };

  return (
    <Container>
      <BackHeader bigTitle={'Shipping Addresses'} />

      <FlatList
        data={addresses}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
      {/* <FAB
        onPress={() => navigate(RoutesName.ADD_EDIT_ADDRESS, {isEdit: false})}
      /> */}
    </Container>
  );
};

export default ShippingAddress;

const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    H0: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text18,
    },
    H1: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text16,
    },
    H2: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text14,
    },
    H3: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
      color: colors.lightBlack,
      lineHeight: 21,
    },
    addressCard: {
      backgroundColor: colors.BACKGROUND,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,

      borderRadius: 8,
      marginVertical: 20,
      padding: 25,
    },
    nameAndChange: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  });
};
