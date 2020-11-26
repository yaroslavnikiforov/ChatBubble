/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const chatSize = 300;
const bubbleSize = 50;
const bubbles = [0, 1, 2];
const delta = 1 / bubbles.length;

function App() {
  const progress = useSharedValue(0);

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <View style={styles.bubblesContainer}>
          {bubbles.map((i) => {
            const start = i * delta;
            const end = start + delta;

            return <Bubble key={i} {...{start, end, progress}} />;
          })}
        </View>
      </View>

      <Button title="Press" onPress={() => {}} />
    </View>
  );
}

function Bubble({start, end, progress}) {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [start, end],
      [0.5, 1],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [start, end],
      [1, 1.5],
      Extrapolate.CLAMP,
    );

    return {opacity, transform: [{scale}]};
  });
  return <Animated.View style={[styles.bubble, style]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  chat: {
    justifyContent: 'center',
    alignItems: 'center',
    width: chatSize,
    height: chatSize,
    backgroundColor: '#c2c2c2',
    borderTopLeftRadius: chatSize / 2,
    borderBottomLeftRadius: chatSize / 2,
    borderTopRightRadius: chatSize / 2,
  },

  bubblesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: bubbles.length * bubbleSize * 1.3,
    borderWidth: 1,
  },

  bubble: {
    width: bubbleSize,
    height: bubbleSize,
    borderRadius: bubbleSize / 2,
    backgroundColor: '#2d5cf6',
  },
});

export default App;
