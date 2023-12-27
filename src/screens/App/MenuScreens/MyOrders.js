import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import Tab from '../../../components/CustomTabs/Tabs';
import CustomText from '../../../components/CustomText/CustomText';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import MyOrderTabScreen from '../../../components/MyOrdersComponents/MyorderTabScreen';

const routes = [
  {key: 'PLACED', title: 'All', component: MyOrderTabScreen},
  {key: 'DELIVERED', title: 'Delivered', component: MyOrderTabScreen},
  {key: 'CANCELLED', title: 'Cancelled', component: MyOrderTabScreen},
];

const MyOrders = () => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  return (
    <Container>
      <BackHeader bigTitle={'My Orders'} />
      <Tab routes={routes} />
    </Container>
  );
};

export default MyOrders;
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
      height: 200,

      borderRadius: 8,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,
      backgroundColor: colors.BACKGROUND,
    },
  });
};
