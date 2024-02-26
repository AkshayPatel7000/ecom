import axios from 'axios';
import {store} from '../../Store/MainStore';
import {setIsLoading} from '../../Store/Slices/LoaderSlice';
import {LocalStorage} from '../../utils/Resource';

const client = axios.create({
  baseURL: 'https://ecombackend-dgdu.onrender.com/',
  // baseURL: 'http://3.7.55.20:3000/',
  // baseURL: 'http://ecombackend.ap-south-1.elasticbeanstalk.com/',
});

client.interceptors.request.use(
  async config => {
    const token = await LocalStorage.getToken();
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    store.dispatch(setIsLoading(true));
    return config;
  },
  function (error) {
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  res => {
    console.log(res.data);
    if (200 <= res.status >= 202) {
      store.dispatch(setIsLoading(false));
      throw res.data;
    }
    store.dispatch(setIsLoading(false));
    return res;
  },
  async error => {
    console.log(error.response.status);
    store.dispatch(setIsLoading(false));
    if (error.message === 'Network Error') {
      store.dispatch(setIsLoading(false));

      console.log('Network Error', JSON.stringify(error?.response));
      if (error?.response?.status === 504) {
        store.dispatch(setIsLoading(false));
        throw {
          message: 'Something went wrong. Please try again later.',
        };
      } else {
        throw {
          message:
            'You are not connected to the internet. Verify your connection and then try again.',
        };
      }
    }
    if (error.response) {
      if (error.response.status === 500) {
        if (error?.response?.data?.error) {
          throw {
            message: error.response.data.error,
          };
        }

        throw {
          message: 'Something went wrong. Please try again later.',
        };
      }
      if (error.response.status === 401) {
        // logout loginStore.logout();logic
        // loginStore.logout();
        await LocalStorage.LocalStorageLogOut();
      }
      if (error.response.status === 403) {
        // redirect user to some home page since that action is not allowed
      }
      if (error.response.status === 404) {
        throw {
          message: 'Something went wrong. Please try again later.',
        };
      }
      throw {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
    store.dispatch(setIsLoading(false));
    throw {
      message: 'Something went wrong. Please try again later.',
    };
  },
);

export default client;
