import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GlobalStyles from './src/components/GlobalStyles/GlobalStyles';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/Routes';
import {useAppDispatch, useTypedSelector} from './src/Store/MainStore';
import {setAuthToken, setUserProfile} from './src/Store/Slices/AuthSlice';
import {COLOR, COLOR_DARK, LocalStorage} from './src/utils/Resource';
import Loader from './src/components/Loader';
import {selectIsLoading} from './src/Store/Slices/LoaderSlice';

const App = () => {
  let isDark = false;
  let theme = isDark ? COLOR_DARK : COLOR;
  const loader = useTypedSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      const LocalData = await LocalStorage.getUser();
      const LocalToken = await LocalStorage.getToken();
      if (LocalData) {
        dispatch(setAuthToken(LocalToken));
        dispatch(setUserProfile(LocalData));
      }
    };
    init();
  }, []);
  return (
    <GestureHandlerRootView style={GlobalStyles.flexOne}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'dark-content'}
      />

      {loader && <Loader />}
      <NavigationContainer
        theme={{...DefaultTheme, colors: {...theme}, dark: isDark}}
        headerMode={false}
        animationEnabled={true}
        screenOptions={{
          headerShown: false,
        }}>
        <Routes />
        <FlashMessage duration={8000} floating animated style={{top: 50}} />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
