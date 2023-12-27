/* eslint-disable no-undef */
export default URLS = {
  LOGIN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  PROFILE_DETAILS: '/api/users/profile',
  GET_CART: '/api/cart/',
  GET_CAROUSEL: '/api/carousel/getCarousel',
  SUB_CAT_WITH_ID: '/api/category/getAllCategory?parentCategory=',
  PRODUCT_BY_CAT: ({
    pageSize = 1000,
    pageNumber = 1,
    sort = 'price_low',
    stock = '',
    category = '',
    minDiscount = 0,
    maxPrice = '100000',
    minPrice = '0',
  }) =>
    `/api/products?color=&size=&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
  GET_ALL_CAT: ({level = 1, pageNumber = 1, pageSize = '100'}) =>
    `/api/category/getAllCategory?level=${level}&pageNumber=${pageNumber}&pageSize=${pageSize}`,

  GET_ALL_PRODUCTS: (
    minPrice = 0,
    maxPrice = 10000,
    minDiscount = 0,
    sort = 'price_high',
    pageNumber = 1,
    pageSize = 1000,
  ) =>
    `/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&stock=null&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,

  ADD_TO_CART: '/api/cart/add',
  CREATE_ORDER: 'api/orders',
  REMOVE_FROM_CART: id => `/api/cart_items/${id}`,
  UPDATE_CART_ITEM: id => `/api/cart_items/${id}`,
  VERIFY_ORDER: (payment_id, order_id, signature) => `/api/payments`,
  GET_MY_ORDERS: (orderStatus = '') =>
    `/api/orders/user?orderStatus=${orderStatus}`,
  GET_DASHBOARD: (limit = 100) => `/api/dashboard/dashboardData?limit=${limit}`,
  GET_ALL_CATEGORIES: (level = 1, pageNumber = 1, pageSize = 100) =>
    `/api/category/getAllCategory?level=${level}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
};
export const HEADERS = {
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};
