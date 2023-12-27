/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';

import {name as appName} from './app.json';
import {store} from './src/Store/MainStore';

AppRegistry.registerComponent(appName, () => StoreApp);
const StoreApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
