import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Chat, Home, Menu, MyBag, Shop} from '../../screens';
import {RoutesName} from '../../utils/Resource';
import * as SVG from '../../assets/SVG';
import {useTypedSelector} from '../../Store/MainStore';
import {selectCartItems} from '../../Store/Slices/CartSlice';
import CustomText from '../../components/CustomText/CustomText';
import {Host} from 'react-native-portalize';

const BottomTab = createBottomTabNavigator();
function MyTabBar({state, descriptors, navigation}) {
  const cart = useTypedSelector(selectCartItems);

  const {colors, dark} = useTheme();
  const styles = getStyles(colors, dark);
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60],
  });
  const safeAreaInsets = useSafeAreaInsets();
  let fromBottom =
    Platform.OS == 'ios' ? safeAreaInsets.bottom : safeAreaInsets.bottom + 20;
  const [showTab, setShowTab] = React.useState(true);
  useEffect(() => {
    const Subs = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Subs.remove();
    };
  }, []);
  const _keyboardDidShow = () => {
    setShowTab(false);
    scrollY.setValue(-100);
  };
  const _keyboardDidHide = () => {
    setShowTab(true);
    scrollY.setValue(0);
  };
  return (
    <>
      {showTab && (
        <Animated.View
          style={[
            styles.main,
            // GlobalStyles.shadow,
            {marginBottom: fromBottom, transform: [{translateY}]},
          ]}>
          <>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              const isFocused = state.index === index;
              const onPress = () => {
                navigation.navigate({name: route.name, merge: true});
              };

              return (
                <View key={label} style={styles.singleItem}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? {selected: true} : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={() => onPress()}>
                    {isFocused ? options.iconInActive : options.icon}
                  </TouchableOpacity>
                  {label === 'Chat' && cart?.totalItem > 0 && (
                    <CustomText
                      viewStyles={{
                        position: 'absolute',
                        top: -8,
                        right: 30,
                        backgroundColor: '#38CCAA',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      style={{color: 'white', fontSize: 10}}>
                      {cart?.totalItem < 10 ? cart?.totalItem : '9+'}
                    </CustomText>
                  )}
                </View>
              );
            })}
          </>
        </Animated.View>
      )}
    </>
  );
}

const BottomTabs = () => {
  const {colors, dark} = useTheme();
  return (
    <Host>
      <BottomTab.Navigator
        tabBar={tabsProps => <MyTabBar {...tabsProps} />}
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        options={{tabBarHideOnKeyboard: true}}
        initialRouteName="Dashboard">
        <BottomTab.Screen
          name={RoutesName.HOME}
          options={{
            tabBarHideOnKeyboard: true,
            icon: <SVG.HomeSVG />,
            iconInActive: <SVG.HomeActiveSVG />,
          }}
          component={Home}
        />
        <BottomTab.Screen
          name={RoutesName.SHOP}
          options={{
            icon: <SVG.Shop />,
            iconInActive: <SVG.ShopActive />,
          }}
          component={Shop}
        />
        <BottomTab.Screen
          name={RoutesName.CHAT}
          options={{
            icon: <SVG.Cart />,
            iconInActive: <SVG.CartActive />,
          }}
          component={MyBag}
        />

        <BottomTab.Screen
          name={RoutesName.MENU}
          options={{
            icon: <SVG.MenuSVG />,
            iconInActive: <SVG.MenuActiveSVG />,
          }}
          component={Menu}
        />
      </BottomTab.Navigator>
    </Host>
  );
};
export default BottomTabs;
const getStyles = (colors, dark) => {
  return StyleSheet.create({
    main: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      backgroundColor: dark ? '#19191980' : '#FFFFFFE6',
      marginHorizontal: 18,
      borderRadius: 20,
      height: 60,
      left: 0,
      right: 0,
    },
    singleItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
  });
};
