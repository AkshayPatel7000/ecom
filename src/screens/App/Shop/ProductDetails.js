import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import {isEmptyImage} from '../../../utils/helperFunction';
import CustomText from '../../../components/CustomText/CustomText';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE, RoutesName, width} from '../../../utils/Resource';
import CustomButton from '../../../components/CustomButton';
import {useTypedSelector} from '../../../Store/MainStore';
import {selectedProductDetails} from '../../../Store/Slices/ShopSlice';
import CarouselSlider, {Pagination} from 'react-native-snap-carousel';
import {selectCartItems} from '../../../Store/Slices/CartSlice';
import {addToCart} from '../../../Services/AppServices/CartServices';


const ProductDetails = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {navigate} = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const selectedProduct = useTypedSelector(selectedProductDetails);
  const cartItems = useTypedSelector(selectCartItems);
  const carouselRef = useRef();

  const addToCartHandler = () => {
    addToCart(selectedProduct._id);
  };

  const isItemInCart = () => {
    let data = cartItems?.cartItems?.findIndex(
      ele => ele?.product?._id === selectedProduct?._id,
    );
    if (data > -1) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <BackHeader Title="Product Details" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={isEmptyImage(selectedProduct.imageUrl[imageCount])}
            style={styles.imageStyles}
          /> */}
          <View style={styles.carouselContainer}>
            <CarouselSlider
              ref={carouselRef}
              data={selectedProduct.imageUrl}
              renderItem={({item}) => {
                return (
                  <Image
                    source={isEmptyImage(item)}
                    style={styles.imageStyles}
                    resizeMode="contain"
                  />
                );
              }}
              sliderWidth={width}
              itemWidth={width}
              loop
              autoplay
              enableMomentum={false}
              lockScrollWhileSnapping={true}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={selectedProduct?.imageUrl?.length}
              activeDotIndex={activeSlide}
              containerStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
              }}
              inactiveDotStyle={{width: 15, height: 15, borderRadius: 10}}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              dotColor={colors.PRIMARY_GREEN}
              inactiveDotColor="#FFFFFF"
            />
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <CustomText numberOfLines={0} style={styles.P_Name}>
            {selectedProduct?.title}
          </CustomText>
          <CustomText numberOfLines={0} style={styles.P_TYPE}>
            {selectedProduct?.category?.name}
          </CustomText>

          <View style={[styles.amountBox, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row'}}>
              <CustomText numberOfLines={0} style={styles.D_AMOUNT}>
                -{selectedProduct?.discountPersent.toFixed(2)}%
              </CustomText>
              <CustomText numberOfLines={0} style={styles.Sym}>
                ₹
              </CustomText>
              <CustomText numberOfLines={0} style={styles.D_PRICE}>
                {selectedProduct.discountedPrice?.toFixed(2)}
              </CustomText>
            </View>
            <CustomText
              style={[
                styles.D_PRICE,
                {color: colors.PRIMARY_GREEN, fontSize: FONTSIZE.Text14},
              ]}>
              In Stock: {selectedProduct.quantity}
            </CustomText>
          </View>
          <View style={styles.amountBox}>
            <CustomText numberOfLines={0} style={styles.MRP}>
              M.R.P. :{'   '}
            </CustomText>
            <CustomText numberOfLines={0} style={styles.O_PRICE}>
              ₹{selectedProduct?.price}
            </CustomText>
          </View>
          <CustomText numberOfLines={0} style={styles.P_TYPE}>
            {selectedProduct?.description}
          </CustomText>
        </View>
      </ScrollView>
      {selectedProduct.quantity > 0 ? (
        <View style={styles.Button}>
          {!isItemInCart() ? (
            <CustomButton title="ADD TO CART" onPress={addToCartHandler} />
          ) : (
            <CustomButton
              title="VIEW CART"
              onPress={() => navigate(RoutesName.CHAT)}
            />
          )}
        </View>
      ) : (
        <View style={styles.Button}>
          <CustomButton title="OUT OF STOCK" isDisable={true} />
        </View>
      )}
    </Container>
  );
};

export default ProductDetails;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    imageContainer: {
      width: '100%',
      height: 450,
    },
    imageStyles: {
      width: '100%',
      height: '100%',
    },
    amountBox: {
      flexDirection: 'row',
      marginVertical: 5,
    },
    O_PRICE: {
      textDecorationStyle: 'solid',
      textDecorationLine: 'line-through',
      color: colors.GRAY200,
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
    },
    MRP: {
      color: colors.GRAY200,
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
    },
    D_AMOUNT: {
      color: colors.RED_100,
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text20,
      marginRight: 20,
    },
    D_PRICE: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text20,
    },
    P_Name: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text22,
    },
    P_TYPE: {
      ...GlobalStyles.W400,
      fontSize: FONTSIZE.Text14,
      color: colors.GRAY100,
      marginBottom: 5,
    },
    Sym: {
      ...GlobalStyles.W400,
      marginRight: 3,
      fontSize: FONTSIZE.Text12,
    },
    Button: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    carouselContainer: {
      position: 'relative',
    },
    slide: {
      height: 280,
      width: width,
    },
    imgStyle: {
      height: '100%',
      width: '100%',
    },
  });
};
