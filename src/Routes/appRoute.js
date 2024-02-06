import React from 'react';
import {StyleSheet} from 'react-native';

import BottomTabs from './BottomTabs/BottomTabs';
import {RoutesName} from '../utils/Resource';
import {
  AddEditAddress,
  CheckoutScreen,
  MyOrders,
  OrderDetails,
  PaymentMethods,
  ProductDetails,
  ProductList,
  Settings,
  ShippingAddress,
  SubCatagories,
  WebViewScreen,
} from '../screens';

const AppRoute = Stack => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={RoutesName.BOTTOM_TABS} component={BottomTabs} />
      <Stack.Screen name={RoutesName.MY_ORDERS} component={MyOrders} />
      <Stack.Screen
        name={RoutesName.SHIPPING_ADDRESS}
        component={ShippingAddress}
      />
      <Stack.Screen name={RoutesName.PAYMENT_MODE} component={PaymentMethods} />
      <Stack.Screen name={RoutesName.SETTINGS} component={Settings} />
      <Stack.Screen name={RoutesName.ORDER_DETAILS} component={OrderDetails} />
      <Stack.Screen name={RoutesName.CHECKOUT} component={CheckoutScreen} />
      <Stack.Screen name={RoutesName.WEB} component={WebViewScreen} />

      <Stack.Screen
        name={RoutesName.ADD_EDIT_ADDRESS}
        component={AddEditAddress}
      />
      <Stack.Screen
        name={RoutesName.SUB_CATAGORIES}
        component={SubCatagories}
      />
      <Stack.Screen name={RoutesName.PRODUCT_LIST} component={ProductList} />
      <Stack.Screen
        name={RoutesName.PRODUCT_DETAILS}
        component={ProductDetails}
      />
    </Stack.Navigator>
  );
};

export default AppRoute;

const styles = StyleSheet.create({});
