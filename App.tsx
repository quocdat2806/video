/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useCallback} from 'react';
import {FlatList, View, Dimensions, Text} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
const demenHeight = Dimensions.get('window').height;
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const videoRef = useRef<VideoRef>(null);
  const flatRef = useRef();
  function RenderCpn() {
    const [pause, setPause] = useState(false);
    const tap = Gesture.Tap().onStart(() => {
      videoRef.current?.pause;
      setPause(!pause);
    });
    const onViewableItemsChanged = ({viewableItems}) => {
      console.log('djdjdjj');
    };
    const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
    const background = require('./src/assets/mp4/video1.mp4');
    return (
      <GestureHandlerRootView>
        <GestureDetector gesture={tap}>
          <View
            style={{
              minHeight: demenHeight,
              margin: 10,
              backgroundColor: 'red',
              position: 'relative',
            }}>
            <Video
              repeat
              paused={pause}
              ref={videoRef}
              source={background}
              style={{flex: 1}}
            />
            <Text
              style={{
                color: 'red',
                position: 'absolute',
                left: '30%',
                right: '30%',
                bottom: '50%',
              }}>
              {pause && 'pause'}
            </Text>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  }

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: demenHeight,
  };
  const handleViewableItemsChanged = useCallback(info => {
    console.log('info', info);
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        initialScrollIndex={0}
        ref={flatRef}
        onScrollToTop={e => {
          console.log('top');
        }}
        onScrollEndDrag={() => {
          if (flatRef) {
            console.log(flatRef);
            flatRef?.current?.scrollToItem(2);
          }
        }}
        onViewableItemsChanged={handleViewableItemsChanged}
        renderItem={({_, index}) => <RenderCpn key={index} />}
        data={[1, 2, 3]}
      />
    </View>
  );
}

export default App;
