import {store} from '../../Store/MainStore';
import {
  setAuthToken,
  setCarousel,
  setDashboard,
  setMyOrders,
  setUserProfile,
} from '../../Store/Slices/AuthSlice';
import {setIsLoading} from '../../Store/Slices/LoaderSlice';
import {showError, showSuccess} from '../../utils/helperFunction';

import {LocalStorage} from '../../utils/Resource';
import {default as Client, default as client} from '../Client/Client';
import URLS, {HEADERS} from '../Client/Endpoints';

export const login = async body => {
  try {
    const {data} = await Client.post(URLS.LOGIN, body);

    LocalStorage.storeToken(data.jwt);
    store.dispatch(setAuthToken(data.jwt));
    getDashBoard();
    getUserProfile(data.jwt);
    getCarousel();
    return data;
  } catch (error) {
    console.log('🛺 ~ file: AuthServices.js:18 ~ login ~ error:', error);
    store.dispatch(setIsLoading(false));
    showError(error.message);
  }
};
export const signUp = async body => {
  try {
    const {data} = await Client.post(URLS.SIGN_UP, body);

    LocalStorage.storeToken(data.jwt);
    store.dispatch(setAuthToken(data.jwt));

    getUserProfile(data.jwt);
    getCarousel();
    return data;
  } catch (error) {
    store.dispatch(setIsLoading(false));
    console.log('🛺 ~ file: AuthServices.js:31 ~ signUp ~ error:', error);

    showError(error.message);
  }
};

export const FCM_UPDATE = async () => {
  try {
    const FCM = await LocalStorage.getFCMToken();

    const {data} = await Client.post(URLS.ADD_FCM, {
      FCMToken: FCM.registerToken,
      PCFCMToken: '',
    });
    console.log('🛺 ~ FCM UPDATED:', data);
  } catch (error) {
    console.log(
      '🛺 ~ file: AuthServices.js:31 ~ constFCM_UPDATE=async ~ error:',
      error,
    );
  }
};

export const getUserProfile = async token => {
  try {
    const {data} = await Client.get(URLS.PROFILE_DETAILS, {
      headers: {Authorization: 'Bearer ' + token},
    });

    LocalStorage.storeUser({...data});
    store.dispatch(setUserProfile({...data}));
  } catch (error) {
    console.log(
      '🚀 ~ file: AuthServices.js:43 ~ getUserProfile ~ error:',
      error,
    );
  }
};

const userLoginData = async tkn => {
  try {
    const {data} = await client.post(URLS.GET_USER_LOGIN_DETAIL(tkn));

    return data.data;
  } catch (error) {
    return error;
  }
};

export const uploadImage = async image => {
  try {
    var lengthUrl = image.path.split('/').length;
    var fileName = image.path.split('/')[lengthUrl - 1];
    var ext = fileName.split('.')[fileName.split('.')?.length - 1];
    const formData = new FormData();
    formData.append('', {
      uri: image.path,
      type: image.mime,
      name: `${Date.now()}.${ext}`,
    });
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const {data} = await client.post(URLS.UPLOAD_IMAGE, formData, {headers});
    return data.path;
  } catch (error) {
    console.log(
      '🚀 ~ file: AuthServices.js:120 ~ getDepartments ~ error:',
      error,
    );
  }
};
export const updateUser = async body => {
  try {
    const token = await LocalStorage.getToken();

    const {data} = await client.post(URLS.UPDATE_USER, body, {
      headers: HEADERS.URLENCODED,
    });
    await getUserProfile(token);
    showSuccess('Profile Updated');
  } catch (error) {
    console.log('🛺 ~ file: AuthServices.js:186 ~ updateUser ~ error:', error);
  }
};
export const getCarousel = async () => {
  try {
    const {data} = await client.get(URLS.GET_CAROUSEL);
    store.dispatch(setCarousel(data.carousel?.Carousellist));
  } catch (error) {
    console.log('🛺 ~ file: AuthServices.js:124 ~ error:', error);
  }
};
export const getDashBoard = async () => {
  try {
    const {data} = await client.get(URLS.GET_DASHBOARD());

    store.dispatch(setDashboard(data));
  } catch (error) {
    console.log('🛺 ~ file: AuthServices.js:137 ~ getMyOrders ~ error:', error);
  }
};
export const getMyOrders = async (status = 'PLACED') => {
  try {
    const {data} = await client.get(URLS.GET_MY_ORDERS(status));

    store.dispatch(setMyOrders({data, status}));
  } catch (error) {
    console.log('🛺 ~ file: AuthServices.js:137 ~ getMyOrders ~ error:', error);
  }
};
