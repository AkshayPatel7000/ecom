import {store} from '../../Store/MainStore';
import {setIsLoading} from '../../Store/Slices/LoaderSlice';
import {
  setAllProduct,
  setCatProduct,
  setCatagoriesItems,
  setSubCatagoriesItems,
} from '../../Store/Slices/ShopSlice';
import client from '../Client/Client';
import Endpoints from '../Client/Endpoints';
import {getCart} from './CartServices';

export const getAllProducts = async () => {
  try {
    const {data} = await client.get(Endpoints.GET_ALL_PRODUCTS());
    store.dispatch(setAllProduct(data));
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:9 ~ getAllProducts ~ error:', error);
  }
};
export const createOrder = async body => {
  try {
    const {data} = await client.post(Endpoints.CREATE_ORDER, body);
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:21 ~ createOrder ~ error:', error);
    return {error: 'Please select valid address.'};
  }
};
export const getAllCategory = async () => {
  try {
    console.log('first');
    const {data} = await client.get(Endpoints.GET_ALL_CATEGORIES());

    store.dispatch(setCatagoriesItems(data.category.Categorylist));
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:21 ~ createOrder ~ error:', error);
  }
};
export const getSubCategorysById = async id => {
  try {
    console.log('id', id);
    const {data} = await client.get(Endpoints.SUB_CAT_WITH_ID + id);

    store.dispatch(setSubCatagoriesItems(data.category.Categorylist));
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:21 ~ createOrder ~ error:', error);
  }
};
export const getAllSubCategory = async () => {
  try {
    const {data} = await client.get(Endpoints.GET_ALL_CATEGORIES(2));

    store.dispatch(setSubCatagoriesItems(data.category.Categorylist));
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:21 ~ createOrder ~ error:', error);
  }
};
export const getProductBySubCat = async category => {
  try {
    const {data} = await client.get(
      Endpoints.PRODUCT_BY_CAT({category: category}),
    );

    store.dispatch(setCatProduct(data));
    return data;
  } catch (error) {
    console.log('🛺 ~ file: ShopService.js:21 ~ createOrder ~ error:', error);
  }
};
