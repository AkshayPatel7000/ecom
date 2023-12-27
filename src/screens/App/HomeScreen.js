import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getAllCategory,
  getAllProducts,
} from '../../Services/AppServices/ShopService';
import {
  getCarousel,
  getMyOrders,
  getUserProfile,
} from '../../Services/AuthServices/AuthServices';
import {useAppDispatch, useTypedSelector} from '../../Store/MainStore';
import {selectDashboard} from '../../Store/Slices/AuthSlice';
import {
  selectedAllProduct,
  setSelectedProduct,
} from '../../Store/Slices/ShopSlice';
import ProductCard from '../../components/Cards/ProductCard';
import Carousel from '../../components/Carousel';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText/CustomText';
import GlobalStyles from '../../components/GlobalStyles/GlobalStyles';
import VirtualizedScrollView from '../../components/VirtualisedScroll';
import {
  FONTFAMILY,
  FONTSIZE,
  RoutesName,
  height,
  useDebounce,
} from '../../utils/Resource';
import {searchByFields} from '../../utils/helperFunction';
import {selectSearchTerm, setSearchTerm} from '../../Store/Slices/LoaderSlice';
import CustomInput from '../../components/CustomInput';
import NormalInput from '../../components/CustomInput/NormalInput';
import SearchBar from '../../components/SearchBar/SearchBar';
import {CrossCircle, Search} from '../../assets/SVG';
const SearchInput = ({search}) => {
  const {colors, dark} = useTheme();

  const searchTerm = useTypedSelector(selectSearchTerm);
  const dispatch = useAppDispatch();
  const {debounce} = useDebounce();
  const handleSearch = useCallback(
    debounce(inputVal => {
      search(inputVal);
    }, 1000),
    [],
  );
  const onRightIconPress = () => {
    if (searchTerm?.trim() !== '') {
      dispatch(setSearchTerm(''));
      search('');
    }
  };
  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        zIndex: 9999,

        height: 55,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: colors.INPUT_BG,
        ...GlobalStyles.shadow,
        borderColor: colors.INPUT_BORDER,
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: height * 0.2,
      }}>
      <Search color={colors.GRAY300} />
      <TextInput
        style={{
          flex: 1,
          height: 55,
          paddingHorizontal: 10,
          color: colors.TEXT,
          fontWeight: '500',
          fontFamily: FONTFAMILY.PoppinsMedium,
          fontSize: FONTSIZE.Text14,
        }}
        placeholder="Search...."
        placeholderTextColor={colors.TEXT}
        value={searchTerm}
        onChangeText={e => {
          dispatch(setSearchTerm(e));
          handleSearch(e);
        }}
      />
      <TouchableOpacity onPress={onRightIconPress}>
        {searchTerm?.trim() !== '' && <CrossCircle dark={dark} />}
      </TouchableOpacity>
    </View>
  );
};
const HomeScreen = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {navigate} = useNavigation();
  const dispatch = useAppDispatch();
  const allProducts = useTypedSelector(selectedAllProduct);

  const [filterData, setFilterData] = useState(allProducts?.content);

  useEffect(() => {
    init();
  }, []);

  const search = async e => {
    if (e.trim() !== '') {
      let data = searchByFields(allProducts?.content, e);
      setFilterData(data);
    } else if (e.trim() === '') {
      setFilterData(allProducts?.content);
    }
  };

  const init = async () => {
    getUserProfile();
    var data = await getAllProducts();
    setFilterData(data?.content);
    getCarousel();
    getMyOrders();
    getMyOrders('DELIVERED');
    getMyOrders('CANCELLED');

    getAllCategory();

    // getAllSubCategory();
  };

  const moveTo = item => {
    dispatch(setSelectedProduct(item));
    navigate(RoutesName.PRODUCT_DETAILS);
  };
  const _renderItem = ({item}) => {
    return (
      <ProductCard
        onPress={() => {
          moveTo(item);
        }}
        item={item}
      />
    );
  };
  return (
    <Container>
      <VirtualizedScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Carousel />
        <View style={styles.h20}></View>

        <SearchInput search={search} />

        <CustomText viewStyles={styles.H1View} style={styles.H1}>
          All Products
        </CustomText>
        <FlatList
          data={filterData}
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
                height: height * 0.2,
              }}>
              <CustomText>Data Not Found</CustomText>
            </View>
          }
        />
      </VirtualizedScrollView>
    </Container>
  );
};

export default HomeScreen;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,

      paddingBottom: 100,
    },
    h20: {
      height: 20,
    },
    columnWrapperStyle: {
      justifyContent: 'space-evenly',
    },

    H1View: {
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    H1: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text22,
    },
  });
};
