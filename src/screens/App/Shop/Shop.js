import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import CustomText from '../../../components/CustomText/CustomText';
import {useNavigation, useTheme} from '@react-navigation/native';
import GlobalStyles from '../../../components/GlobalStyles/GlobalStyles';
import {FONTSIZE, RoutesName} from '../../../utils/Resource';
import {
  selectCatagories,
  setSelectedCategory,
} from '../../../Store/Slices/ShopSlice';
import {useAppDispatch, useTypedSelector} from '../../../Store/MainStore';

const Shop = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const Catagories = useTypedSelector(selectCatagories);

  const moveTo = item => {
    dispatch(setSelectedCategory(item));
    navigation.navigate(RoutesName.SUB_CATAGORIES);
  };

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
              bigTitle={'Catagories'}
              showBack={false}
              bigTitleStyles={styles.backTitle}
            />

            <CustomText style={styles.H1}>Choose category</CustomText>
          </>
        }
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
        data={Catagories}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={<View style={styles.divider} />}
      />
    </Container>
  );
};

export default Shop;
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
