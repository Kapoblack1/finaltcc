// Importações necessárias
import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const BottomSheet = ({children}) => {
  const translateY = useSharedValue(0);
  const sheetRef = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const bottomSheetHeight = screenHeight * 0.4; // Altura do Bottom Sheet como 40% da altura da tela

  // Manipulador de gestos para o Bottom Sheet
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (_) => {
      // Simples lógica para fechar ou abrir com base no movimento
      if (translateY.value > bottomSheetHeight / 2) {
        translateY.value = withSpring(bottomSheetHeight);
      } else {
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.bottomSheet, animatedStyle, { height: bottomSheetHeight }]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default BottomSheet;
