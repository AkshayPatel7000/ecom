import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import VirtualizedScrollView from './VirtualisedScroll';
const DATA = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
  {id: 10},
  {id: 11},
  {id: 12},
  {id: 13},
  {id: 14},
];

const Header_Max_Height = 280;
const Header_Min_Height = 0;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({value, DynamicHeaderComponent, input}) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  const animatedHeaderOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  });
  const animatedInputHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });
  const animatedInputTop = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, 15],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View>
      <Animated.View
        style={[
          styles.header,
          {
            height: animatedHeaderHeight,
            backgroundColor: animatedHeaderColor,
            // opacity: animatedHeaderOpacity,
          },
        ]}>
        {/* {DynamicHeaderComponent()} */}

        {/* <Text style={styles.title}>Header Content</Text> */}
      </Animated.View>
      {/* <Animated.View style={{top: animatedInputTop}}>{input}</Animated.View> */}
    </Animated.View>
  );
};

const ScrollViewScreen = ({
  DynamicHeaderComponent = () => {},
  input,
  scrollComponent,
  contentContainerStyle,
}) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1}}>
      <DynamicHeader
        value={scrollOffsetY}
        DynamicHeaderComponent={DynamicHeaderComponent}
        input={input}
      />
      <VirtualizedScrollView
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {/* {scrollComponent} */}
        {DATA.map(val => {
          return (
            <View style={styles.card}>
              <Text style={styles.subtitle}>({val.id})</Text>
            </View>
          );
        })}
      </VirtualizedScrollView>
    </View>
  );
};

export default ScrollViewScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    // paddingTop: 25,
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
});
