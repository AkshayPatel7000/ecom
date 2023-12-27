import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import CustomText from '../../../components/CustomText/CustomText';
import {useNavigation, useTheme} from '@react-navigation/native';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE, RoutesName} from '../../../utils/Resource';
import {
  selectSubCatagories,
  selectedCategory,
  setCatProduct,
  setSelectedSubCategory,
} from '../../../Store/Slices/ShopSlice';
import {useAppDispatch, useTypedSelector} from '../../../Store/MainStore';
import {getSubCategorysById} from '../../../Services/AppServices/ShopService';

const SubCatagories = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const subCatagories = useTypedSelector(selectSubCatagories);
  const categorySelected = useTypedSelector(selectedCategory);
  const dispatch = useAppDispatch();
  const moveTo = item => {
    dispatch(setSelectedSubCategory(item));
    dispatch(setCatProduct([]));
    navigation.navigate(RoutesName.PRODUCT_LIST);
  };

  useEffect(() => {
    getSubCategorysById(categorySelected._id);
  }, []);

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.cardMain} onPress={() => moveTo(item)}>
        <CustomText style={styles.H2}>{item.name}</CustomText>
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <BackHeader
              bigTitle={'Sub Catagories'}
              bigTitleStyles={styles.backTitle}
            />

            <CustomText style={styles.H1}>Choose sub category</CustomText>
          </>
        }
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
        data={subCatagories}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={<View style={styles.divider} />}
      />
    </Container>
  );
};

export default SubCatagories;
const getStyles = colors => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    backTitle: {paddingHorizontal: 0, marginBottom: 10},
    cardMain: {
      height: 50,

      justifyContent: 'center',
      paddingHorizontal: 20,
      ...GlobalStyles.shadow,
      backgroundColor: colors.BACKGROUND,
      shadowColor: colors.GRAY100,
      borderRadius: 8,
    },
    divider: {
      height: 10,
    },
    ListHeaderComponentStyle: {
      marginBottom: 20,
    },
    H2: {
      ...GlobalStyles.W400,

      fontSize: FONTSIZE.Text16,
    },
    H1: {
      ...GlobalStyles.W400,
      color: colors.GRAY100,
      fontSize: FONTSIZE.Text16,
    },
  });
};
