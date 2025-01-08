import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,GestureResponderEvent  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Canvas, Fill, LinearGradient, vec, interpolateColors } from '@shopify/react-native-skia';
import { useSharedValue, useDerivedValue, withRepeat, withTiming , withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');
interface AnimatedButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}
const AnimatedButton: React.FC<AnimatedButtonProps>  = ({ onPress, title }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableOpacity
      style={[styles.button, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const { removeAuthToken, clearSavedEmail} = useAuth();

  React.useEffect(() => {
    SecureStore.getItemAsync('authToken')
      .then((storedToken) => {
        console.log('Token from SecureStore (then):', storedToken);
      })
      .catch((error) => {
        console.error('Error retrieving token:', error);
      });
    
  }, []);
  const colorsIndex = useSharedValue(0);

  React.useEffect(() => {
    colorsIndex.value = withRepeat(withTiming(3, { duration: 4000 }), -1, true);
  }, [colorsIndex]);

  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], [
        'rgba(34, 193, 195, 0.4)',
        'rgba(34,193,195,0.4)',
        'rgba(63,94,251,1)',
        'rgba(253,29,29,0.4)',
      ]),
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], [
        'rgba(0,212,255,0.4)',
        'rgba(253,187,45,0.4)',
        'rgba(252,70,107,1)',
        'rgba(252,176,69,0.4)',
      ]),
    ];
  });


  return (
    <View style={styles.container}>
    <Canvas style={styles.canvas}>
      <Fill>
        <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={gradientColors} />
      </Fill>
    </Canvas>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Welcome to App</Text>
      <Text style={styles.subtitle}>Experience the best</Text>
    </View>
    <AnimatedButton
        title="Remove Token"
        onPress={async () => {
          await removeAuthToken();
          SecureStore.getItemAsync('authToken')
            .then((storedToken) => {
              console.log('Token from SecureStore (then):', storedToken);
            })
            .catch((error) => {
              console.error('Error retrieving token:', error);
            });
        }}
      />
      <AnimatedButton
        title="Remove Email"
        onPress={async () => {
          await clearSavedEmail();
          SecureStore.getItemAsync('savedEmail')
            .then((storedToken) => {
              console.log('Token from SecureStore (then):', storedToken);
            })
            .catch((error) => {
              console.error('Error retrieving token:', error);
            });
        }}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor:'#f3ee76'
  // },
  // semiCircle: {
  //   width: 200,
  //   height: 200,
  //   backgroundColor: '#48abe0',
  //   borderTopLeftRadius: 100,
  //   borderBottomLeftRadius: 100,
  //   borderTopRightRadius: 0,
  //   borderBottomRightRadius: 0,
  //   transform: [{ rotate: '90deg' }],
  // },
  // rectangle: {
  //   width: 4,
  //   height: 100,
  //   backgroundColor: '#48abe0',
  //   transform: [{ rotate: '45deg' }],},
  // text: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // button: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#007AFF',
  //   padding: 10,
  //   borderRadius: 5,
  //   marginTop: 20,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   marginLeft: 10,
  // },
});

