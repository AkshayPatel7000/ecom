import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
const WebViewScreen = props => {
  const displaySpinner = () => {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <WebView
      startInLoadingState={true}
      renderLoading={() => {
        return displaySpinner();
      }}
      source={{uri: props.route.params.url}}
      style={{flex: 1}}
    />
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
