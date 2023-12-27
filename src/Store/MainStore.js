import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import AuthSlice from './Slices/AuthSlice';
import CartSlice from './Slices/CartSlice';
import ShopSlice from './Slices/ShopSlice';
import LoaderSlice from './Slices/LoaderSlice';

export const createStore = options =>
  configureStore({
    reducer: {
      AuthSlice: AuthSlice,
      CartSlice: CartSlice,
      ShopSlice: ShopSlice,
      Loader: LoaderSlice,
    },
    ...options,
  });

export const store = createStore();

export const useAppDispatch = useDispatch;

export const useTypedSelector = useSelector;
