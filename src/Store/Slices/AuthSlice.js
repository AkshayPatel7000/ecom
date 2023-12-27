import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authToken: '',
  userData: {},
  userProfile: {},
  departments: [],
  designation: [],
  homeCarousel: [],
  myOrdersPENDING: [],
  myOrdersDELIVERED: [],
  myOrdersCANCELLED: [],
  mySelectedOrder: {},
  dashboard: {},
};

const slice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setDesignation: (state, action) => {
      state.designation = action.payload;
    },
    setCarousel: (state, action) => {
      state.homeCarousel = action.payload;
    },
    setMyOrders: (state, action) => {
      if (action.payload.status === 'CANCELLED') {
        state.myOrdersCANCELLED = action.payload.data;
      }
      if (action.payload.status === 'DELIVERED') {
        state.myOrdersDELIVERED = action.payload.data;
      }
      if (action.payload.status === 'PLACED') {
        state.myOrdersPENDING = action.payload.data;
      }
    },
    setSelectedOrder: (state, action) => {
      state.mySelectedOrder = action.payload;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});

export const {
  setAuthToken,
  setUserProfile,
  setDepartments,
  setDesignation,
  setCarousel,
  setMyOrders,
  setSelectedOrder,
  setDashboard,
} = slice.actions;

export default slice.reducer;

export const selectAuthToken = state => state.AuthSlice.authToken;
export const selectUserData = state => state.AuthSlice.userData;
export const selectUserProfile = state => state.AuthSlice.userProfile;
export const selectDepartments = state => state.AuthSlice.departments;
export const selectDesignation = state => state.AuthSlice.designation;
export const selectCarouselData = state => state.AuthSlice.homeCarousel;
export const selectMyOrdersPENDING = state => state.AuthSlice.myOrdersPENDING;
export const selectMyOrdersCANCLED = state => state.AuthSlice.myOrdersCANCELLED;
export const selectMyOrdersDELIVERED = state =>
  state.AuthSlice.myOrdersDELIVERED;
export const selectedOrderData = state => state.AuthSlice.mySelectedOrder;
export const selectDashboard = state => state.AuthSlice.dashboard;
