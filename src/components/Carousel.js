import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import CarouselSlider, {Pagination} from 'react-native-snap-carousel';
// import {CarouselData} from '../data/CarouselData';
import {width} from '../utils/Resource';
import {useTheme} from '@react-navigation/native';
import {useTypedSelector} from '../Store/MainStore';
import {selectCarouselData} from '../Store/Slices/AuthSlice';
import {isEmptyImage} from '../utils/helperFunction';

const Carousel = () => {
  const carouselRef = useRef();

  const CarouselData = useTypedSelector(selectCarouselData);

  const [activeSlide, setActiveSlide] = useState(0);
  const {colors} = useTheme();
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          source={isEmptyImage(item?.image)}
          style={styles.imgStyle}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <CarouselSlider
        ref={carouselRef}
        data={CarouselData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        loop
        autoplay
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={CarouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotStyle={{width: 15, height: 15, borderRadius: 10}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor={colors.PRIMARY_GREEN}
        inactiveDotColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
  },
  slide: {
    height: 280,
    width: width,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
  },
});

export default Carousel;
