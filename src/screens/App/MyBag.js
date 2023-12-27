import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RemoveFromCart,
  UpdateCart,
  getCart,
} from '../../Services/AppServices/CartServices';
import {useTypedSelector} from '../../Store/MainStore';
import {selectCartItems} from '../../Store/Slices/CartSlice';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText/CustomText';
import GlobalStyles from '../../components/GlobalStyles/GlobalStyles';
import BackHeader from '../../components/Headers/BackHeader';
import {FONTSIZE, RoutesName, height} from '../../utils/Resource';
import {isEmptyImage} from '../../utils/helperFunction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const MyBag = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {navigate} = useNavigation();
  const cart = useTypedSelector(selectCartItems);

  useEffect(() => {
    getCart();
  }, []);
  const deteleItemFromCart = async id => {
    await RemoveFromCart(id);
  };

  const updateQTY = (item, value) => {
    console.log(item.quantity + value);

    UpdateCart(item._id, item.quantity + value);
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={{width: '35%'}}>
          <Image
            source={isEmptyImage(item?.product?.imageUrl)}
            style={{width: '100%', height: '100%', borderRadius: 8}}
          />
        </View>

        <View style={{width: '65%', padding: 10}}>
          <CustomText style={styles.H1} numberOfLines={2}>
            {item?.product?.title}
          </CustomText>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <CustomText style={styles.H2}>C: </CustomText>
              <CustomText style={styles.H2L}>Gary</CustomText>
            </View>

            <View style={{width: 20}}></View>
            <View style={{flexDirection: 'row'}}>
              <CustomText style={styles.H2}>Size: </CustomText>
              <CustomText style={styles.H2L}>{item.size}</CustomText>
            </View>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={item.quantity < 2}
                style={styles.I_D_BUTTON}
                onPress={() => updateQTY(item, -1)}>
                <CustomText style={styles.BUTTON_TEXT}>-</CustomText>
              </TouchableOpacity>
              <CustomText
                style={styles.H2L}
                viewStyles={{width: '30%', alignItems: 'center'}}>
                {item.quantity}
              </CustomText>
              <TouchableOpacity
                disabled={item.quantity == item.product.quantity}
                style={styles.I_D_BUTTON}
                onPress={() => updateQTY(item, 1)}>
                <CustomText style={styles.BUTTON_TEXT}>+</CustomText>
              </TouchableOpacity>
            </View>

            <CustomText style={[styles.H1, {marginTop: 10}]}>
              ₹ {item.price}
            </CustomText>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => deteleItemFromCart(item?._id)}
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: colors.RED_200,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: -10,
            right: 0,
          }}>
          <Icon name="delete" size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
    );
  };
  const _ListFooterComponent = () => {
    return (
      <>
        {cart?.cartItems?.length > 0 && (
          <View style={{marginVertical: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
                Total amount:
              </CustomText>
              <CustomText style={styles.H0}>₹ {cart.totalPrice}</CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
                Discount:
              </CustomText>
              <CustomText style={styles.H0}>₹ {cart.discounte}</CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
                Total Items:
              </CustomText>
              <CustomText style={styles.H0}>{cart.totalItem}</CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CustomText style={[styles.H0, {color: colors.GRAY100}]}>
                Amount To Pay:
              </CustomText>
              <CustomText style={styles.H0}>
                ₹ {cart.totalDiscountedPrice}
              </CustomText>
            </View>
            <CustomButton
              title="CHECK OUT"
              onPress={() => navigate(RoutesName.CHECKOUT)}
            />
          </View>
        )}
      </>
    );
  };
  return (
    <Container>
      <FlatList
        data={cart?.cartItems}
        renderItem={_renderItem}
        ListHeaderComponent={
          <BackHeader
            bigTitle={'My Bag'}
            showBack={false}
            bigTitleStyles={{paddingHorizontal: 0, marginBottom: 10}}
          />
        }
        keyExtractor={e => e._id}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={<View style={{height: 20}} />}
        ListFooterComponent={_ListFooterComponent}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.6,
            }}>
            <CustomText>No item found</CustomText>
          </View>
        }
      />
    </Container>
  );
};

export default MyBag;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,

      paddingBottom: 100,
    },
    card: {
      height: 150,
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: colors.BACKGROUND,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,
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
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text12,
      color: colors.GRAY100,
    },

    H2L: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text12,
    },
    BUTTON_TEXT: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text16,
      color: colors.GRAY100,
      marginTop: 4,
    },
    I_D_BUTTON: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.BACKGROUND,
      ...GlobalStyles.shadow,
      shadowColor: colors.GRAY100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
