import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import CustomText from '../../../components/CustomText/CustomText';
import VirtualizedScrollView from '../../../components/VirtualisedScroll';
import {FONTSIZE} from '../../../utils/Resource';
import {useNavigation, useTheme} from '@react-navigation/native';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import {isEmptyImage} from '../../../utils/helperFunction';
import {useTypedSelector} from '../../../Store/MainStore';
import {
  selectUserProfile,
  selectedOrderData,
} from '../../../Store/Slices/AuthSlice';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton';
import {cancelOrder} from '../../../Services/AuthServices/AuthServices';

const OrderDetails = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigate = useNavigation();

  const [OrderAddress, setOrderAddress] = useState({});
  const selectedOrder = useTypedSelector(selectedOrderData);
  const userProfile = useTypedSelector(selectUserProfile);
  useEffect(() => {
    const AddressId = selectedOrder.shippingAddress;
    const orderAddress = userProfile.addresses.find(
      ele => ele._id === AddressId,
    );
    setOrderAddress(orderAddress);
  }, []);
  const orderCancel = async () => {
    try {
      await cancelOrder(selectedOrder._id);
      navigate.goBack();
    } catch (error) {}
  };
  const _renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={{height: 100, width: '30%'}}>
          <Image
            source={isEmptyImage(item?.imageUrl)}
            style={{width: '100%', height: '100%', borderRadius: 8}}
          />
        </View>
        <View style={{width: '70%', padding: 10}}>
          <CustomText numberOfLines={3} style={styles.H1}>
            {item?.title}
          </CustomText>
          {/* <CustomText style={styles.H2}>Mango</CustomText> */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <CustomText style={styles.H2}>Color: </CustomText>
              <CustomText style={styles.H2L}>Gary</CustomText>
            </View>

            <View style={{width: 20}}></View>
            <View style={{flexDirection: 'row'}}>
              <CustomText style={styles.H2}>Size: </CustomText>
              <CustomText style={styles.H2L}>L</CustomText>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <CustomText style={styles.H2}>QTY: </CustomText>
              <CustomText style={styles.H2L}>
                {selectedOrder?.quantity}
              </CustomText>
            </View>
            <CustomText style={styles.H1}>₹{item?.discountedPrice?.toFixed(2)}</CustomText>
          </View>
        </View>
      </View>
    );
  };
  const _ListFooterComponent = () => {
    return (
      <View style={{marginVertical: 20}}>
        <CustomText style={[styles.H1, {marginBottom: 15}]}>
          Order information
        </CustomText>
        <View style={styles.orderInfo}>
          <CustomText style={styles.H3} viewStyles={{width: '40%'}}>
            Shipping Address:{' '}
          </CustomText>
          <CustomText numberOfLines={5} style={[styles.H3L, {width: '60%'}]}>
            {`${OrderAddress?.streetAddress}, ${OrderAddress?.city}, ${OrderAddress?.state}, ${OrderAddress?.zipCode}`}
          </CustomText>
        </View>
        {/* <View style={styles.orderInfo}>
          <CustomText style={styles.H3} viewStyles={{width: '40%'}}>
            Payment Id:{' '}
          </CustomText>
          <CustomText style={styles.H3L}>
            {selectedOrder?.paymentDetails?.paymentId}
          </CustomText>
        </View> */}
        {/* <View style={styles.orderInfo}>
          <CustomText style={styles.H3} viewStyles={{width: '40%'}}>
            Delivery method:{' '}
          </CustomText>
          <CustomText style={styles.H3L}>FedEx, 3 days, 15$</CustomText>
        </View> */}
        {/* <View style={styles.orderInfo}>
          <CustomText style={styles.H3} viewStyles={{width: '40%'}}>
            Discount:{' '}
          </CustomText>
          <CustomText style={styles.H3L}>
            ₹ {selectedOrder.discounte}
          </CustomText>
        </View> */}
        <View style={styles.orderInfo}>
          <CustomText style={styles.H3} viewStyles={{width: '40%'}}>
            Total Amount:{' '}
          </CustomText>
          <CustomText style={styles.H3L}>
            ₹ {selectedOrder?.discountedPrice?.toFixed(2)}
          </CustomText>
        </View>
      </View>
    );
  };
  return (
    <Container>
      <BackHeader Title="Order Details" />
      <VirtualizedScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View
          style={[
            styles.orderNoContainer,
            {justifyContent: 'space-between', marginBottom: 10},
          ]}>
          <View style={styles.orderNoContainer}>
            <CustomText style={styles.textOrderNo}>Order № </CustomText>
            <CustomText style={[styles.textOrderNo, {width: '100%'}]}>
              {selectedOrder?.order_id}
            </CustomText>
          </View>
          <CustomText style={[styles.dateText]}>
            {moment(selectedOrder.createdAt).format('ll')}
          </CustomText>
        </View>
        <View
          style={[
            styles.orderNoContainer,
            {justifyContent: 'space-between', marginBottom: 10},
          ]}>
          <View style={styles.orderNoContainer}>
            <CustomText style={styles.dateText}>Tracking no.: </CustomText>
            <CustomText style={[styles.dateText, {width: '90%'}]}>
              {selectedOrder?._id}
            </CustomText>
          </View>
          <CustomText style={[styles.dateText, {color: colors['Delivered']}]}>
            {selectedOrder.orderStatus}
          </CustomText>
        </View>
        <CustomText style={styles.dateText}>
          {selectedOrder?.totalItem} Items
        </CustomText>

        <FlatList
          data={[selectedOrder?.product]}
          renderItem={_renderItem}
          ItemSeparatorComponent={<View style={{height: 20}} />}
          ListFooterComponent={_ListFooterComponent}
        />
      </VirtualizedScrollView>
      {selectedOrder.orderStatus === 'PLACED' && (
        <View style={styles.Button}>
          <CustomButton title="Cancel Order" onPress={orderCancel} />
        </View>
      )}
    </Container>
  );
};

export default OrderDetails;

const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingBottom: 60,
      marginTop: 10,
      paddingHorizontal: 20,
    },
    orderNoContainer: {
      flexDirection: 'row',
    },
    textOrderNo: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text16,
    },
    dateText: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
      color: colors.GRAY100,
    },
    card: {
      borderRadius: 8,
      flexDirection: 'row',
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,
      backgroundColor: colors.BACKGROUND,
    },
    H1: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text16,
    },
    H2: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text12,
      color: colors.GRAY100,
    },

    H2L: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text12,
    },
    H3: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
      color: colors.GRAY200,
    },

    H3L: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
    },
    orderInfo: {
      flexDirection: 'row',
      marginVertical: 4,
      width: '100%',
    },
    Button: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
  });
};
