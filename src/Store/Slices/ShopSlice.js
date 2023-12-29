import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allProducts: {},
  catagories: [],
  selectedCategory: {},
  subCatagories: [],
  selectedSubCategory: {},
  productList: [],
  selectedProduct: {},
  subCatProduct: [],
};

const slice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setCatagoriesItems: (state, action) => {
      state.catagories = action.payload;
    },
    setSubCatagoriesItems: (state, action) => {
      state.subCatagories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setAllProduct: (state, action) => {
      state.allProducts = action.payload;
    },
    setCatProduct: (state, action) => {
      state.subCatProduct = action.payload;
    },

    resetShopSlice: (state, action) => {
      state = {
        allProducts: {},
        catagories: [],
        selectedCategory: {},
        subCatagories: [],
        selectedSubCategory: {},
        productList: [],
        selectedProduct: {},
        subCatProduct: [],
      };
    },
  },
});

export const {
  setCatagoriesItems,
  setSubCatagoriesItems,
  setSelectedCategory,
  setSelectedSubCategory,
  resetShopSlice,
  setSelectedProduct,
  setProductList,
  setAllProduct,
  setCatProduct,
} = slice.actions;

export default slice.reducer;

export const selectCatagories = state => state.ShopSlice.catagories;
export const selectSubCatagories = state => state.ShopSlice.subCatagories;
export const selectedCategory = state => state.ShopSlice.selectedCategory;
export const selectedSubCategory = state => state.ShopSlice.selectedSubCategory;
export const selectProductList = state => state.ShopSlice.productList;
export const selectedProductDetails = state => state.ShopSlice.selectedProduct;
export const selectedAllProduct = state => state.ShopSlice.allProducts;
export const selectedCATProduct = state => state.ShopSlice.subCatProduct;
