import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CustomText from '../CustomText/CustomText';
import {useTheme} from '@react-navigation/native';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import {FONTSIZE} from '../../utils/Resource';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

export default function Tab({
  routes = [
    {key: 'first', title: 'First', component: FirstRoute},
    {key: 'second', title: 'Second', component: SecondRoute},
    {key: 'third', title: 'Third', component: FirstRoute},
  ],
}) {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const createScene = () => {
    let Scene = {};
    routes?.map(item => {
      Scene[item.key] = item.component;
    });
    return Scene;
  };

  const make = createScene();
  const renderScene = SceneMap(make);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor={'transparent'}
      style={{
        backgroundColor: colors.BACKGROUND,
        elevation: 0,
      }}
      renderIndicator={() => {}}
      renderLabel={e => {
        return (
          <View
            style={{
              backgroundColor: e.focused ? colors.black : '#fff',
              borderRadius: 50,
              paddingVertical: 8,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={[
                styles.tabTitle,
                {color: !e.focused ? colors.black : '#fff'},
              ]}>
              {e.route.title}
            </CustomText>
          </View>
        );
      }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
const getStyles = colors => {
  return StyleSheet.create({
    tabTitle: {
      ...GlobalStyles.W500,
      fontSize: FONTSIZE.Text14,
    },
  });
};
