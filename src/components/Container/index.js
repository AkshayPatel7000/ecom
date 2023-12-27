import {useTheme} from '@react-navigation/native';

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Container = ({
  contentContainerStyle = {},
  containerStyle = {},
  statusColor,
  statusContent,
  children,
}) => {
  const {colors, dark} = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const styles = getStyles(safeAreaInsets);
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={[styles.contentContainerStyle, contentContainerStyle]}>
        {children}
      </SafeAreaView>
    </View>
  );
};

export default Container;

const getStyles = safeAreaInsets => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
      // paddingTop: safeAreaInsets.top,
    },
    contentContainerStyle: {flex: 1},
  });
};
