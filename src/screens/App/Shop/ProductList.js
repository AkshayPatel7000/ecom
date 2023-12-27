import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAppDispatch, useTypedSelector} from '../../../Store/MainStore';
import {
  selectProductList,
  selectedAllProduct,
  selectedCATProduct,
  selectedSubCategory,
  setSelectedProduct,
} from '../../../Store/Slices/ShopSlice';
import ProductCard from '../../../components/Cards/ProductCard';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import {RoutesName, height} from '../../../utils/Resource';
import {getProductBySubCat} from '../../../Services/AppServices/ShopService';
import CustomText from '../../../components/CustomText/CustomText';

const ProductList = () => {
  const {navigate} = useNavigation();
  const dispatch = useAppDispatch();
  const subCatagories = useTypedSelector(selectedSubCategory);
  const allProducts = useTypedSelector(selectedAllProduct);
  const subProducts = useTypedSelector(selectedCATProduct);
  useEffect(() => {
    getProductBySubCat(subCatagories._id);
  }, []);

  const moveTo = item => {
    dispatch(setSelectedProduct(item));
    navigate(RoutesName.PRODUCT_DETAILS);
  };

  const _renderItem = ({item}) => {
    return (
      <ProductCard
        item={item}
        onPress={() => {
          moveTo(item);
        }}
      />
    );
  };
  return (
    <Container>
      <BackHeader Title={subCatagories.name} />
      <FlatList
        data={subProducts?.content}
        ItemSeparatorComponent={<View style={styles.h20} />}
        renderItem={_renderItem}
        columnWrapperStyle={styles.columnWrapperStyle}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.8,
            }}>
            <CustomText>Data Not Found</CustomText>
          </View>
        }
      />
    </Container>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 20,
  },
  columnWrapperStyle: {justifyContent: 'space-evenly'},
  h20: {height: 20},
});
