import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import CustomText from '../CustomText/CustomText';
import {FONTSIZE, RoutesName, height} from '../../utils/Resource';
import {useAppDispatch, useTypedSelector} from '../../Store/MainStore';
import {
  selectMyOrders,
  selectMyOrdersCANCLED,
  selectMyOrdersDELIVERED,
  selectMyOrdersPENDING,
  setSelectedOrder,
} from '../../Store/Slices/AuthSlice';
import moment from 'moment';
import {getMyOrders} from '../../Services/AuthServices/AuthServices';

const MyOrderTabScreen = props => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const {navigate} = useNavigation();
  const myOrdersPENDING = useTypedSelector(selectMyOrdersPENDING);
  const myOrdersCANCELLED = useTypedSelector(selectMyOrdersCANCLED);
  const myOrdersDELIVERED = useTypedSelector(selectMyOrdersDELIVERED);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dataCall();
  }, []);
  const dataCall = async () => {
    getMyOrders(props?.route?.key);
  };
  const moveTo = item => {
    dispatch(setSelectedOrder(item));
    navigate(RoutesName.ORDER_DETAILS);
  };
  const _renderItem = ({item}) => {
    return (
      <View style={styles.itemCard}>
        <View style={styles.orderNoContainer}>
          <CustomText style={[styles.dateText]} numberOfLines={2}>
            {item?.product?.title}
          </CustomText>
          {/* <CustomText style={[styles.textOrderNo, GlobalStyles.W500]}>
            {item.product.title}
          </CustomText> */}
        </View>
        <View
          style={[
            styles.orderNoContainer,
            {justifyContent: 'space-between', marginBottom: 10},
          ]}>
          <View style={styles.orderNoContainer}>
            <CustomText style={styles.textOrderNo}>Order № </CustomText>
            <CustomText style={[styles.textOrderNo, {width: 150}]}>
              {item?.order_id}
            </CustomText>
          </View>
          <CustomText style={[styles.dateText]}>
            {moment(item?.createdAt).format('ll')}
          </CustomText>
        </View>

        <View
          style={[styles.orderNoContainer, {justifyContent: 'space-between'}]}>
          <View style={styles.orderNoContainer}>
            <CustomText style={styles.dateText}>Quantity: </CustomText>
            <CustomText
              style={[
                styles.dateText,
                GlobalStyles.W500,
                {color: colors.TEXT},
              ]}>
              {item?.quantity}
            </CustomText>
          </View>
          <View style={styles.orderNoContainer}>
            <CustomText style={styles.dateText}>Total Amount: </CustomText>
            <CustomText
              style={[
                styles.dateText,
                GlobalStyles.W500,
                {color: colors.TEXT},
              ]}>
              {item?.discountedPrice}
            </CustomText>
          </View>
        </View>

        <View
          style={[
            styles.orderNoContainer,
            {
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            },
          ]}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => moveTo(item)}>
            <CustomText>Details</CustomText>
          </TouchableOpacity>
          <CustomText
            style={[styles.dateText, {color: colors[item.orderStatus]}]}>
            {item?.orderStatus}
          </CustomText>
        </View>
      </View>
    );
  };
  const getData = () => {
    switch (props.route.key) {
      case 'DELIVERED':
        return myOrdersDELIVERED;
      case 'PLACED':
        return myOrdersPENDING;
      case 'CANCELLED':
        return myOrdersCANCELLED;
      default:
        return [];
    }
  };
  return (
    <View style={styles.main}>
      <FlatList
        onRefresh={() => {
          setRefreshing(true);
          dataCall();
          setRefreshing(false);
        }}
        refreshing={refreshing}
        key={props.route.key}
        data={getData()}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={<View style={{height: 20}} />}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              height: height * 0.7,
            }}>
            <CustomText>Data Not Found</CustomText>
          </View>
        }
      />
    </View>
  );
};

export default MyOrderTabScreen;

const getStyle = colors => {
  return StyleSheet.create({
    main: {
      backgroundColor: colors.BACKGROUND,
    },
    contentContainerStyle: {
      paddingBottom: 60,
      marginTop: 10,
      paddingHorizontal: 20,
    },
    itemCard: {
      borderRadius: 8,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,
      backgroundColor: colors.BACKGROUND,
      padding: 20,
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
    extraText: {width: 150, color: colors.GRAY100},
    detailButton: {
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
  });
};
