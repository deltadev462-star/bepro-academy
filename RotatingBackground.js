import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * RotatingBackground Component
 * Displays a fullscreen rotating background image with low opacity
 * Compatible with Expo SDK 32 and React Native Web
 */
export default class RotatingBackground extends Component {
  constructor(props) {
    super(props);
    // Initialize rotation value
    this.rotateValue = new Animated.Value(0);
  }

  componentDidMount() {
    // Start the rotation animation when component mounts
    this.startRotation();
  }

  startRotation = () => {
    // Reset rotation value to 0
    this.rotateValue.setValue(0);
    
    // Create infinite rotation animation
    Animated.loop(
      Animated.timing(this.rotateValue, {
        toValue: 1,
        duration: 75000, // 75 seconds for one full rotation
        useNativeDriver: Platform.OS !== 'web', // Native driver not supported on web in SDK 32
      })
    ).start();
  };

  render() {
    // Interpolate rotation value to degrees
    const rotate = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    // Get image source from props with default
    const imageSource = this.props.source || require('./assets/hero-background.png');
    
    // Get opacity from props with default
    const opacity = this.props.opacity || 1;

    return (
      <View style={styles.container}>
        {/* Space-themed gradient background */}
        <View style={styles.spaceBackground} />
        
        {/* Rotating planet image */}
        <Animated.Image
          source={imageSource}
          style={[
            styles.planetImage,
            {
              opacity: opacity,
              transform: [{ rotate }],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Ensure the background is behind all other content
    zIndex: -1,
    // Center the rotating image
    alignItems: 'center',
    justifyContent: 'center',
    // Prevent overflow on web
    overflow: 'hidden',
  },
  spaceBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // Deep space gradient from dark blue to lighter sky blue
    backgroundColor: '#000428', // Dark blue base
    ...Platform.select({
      web: {
        background: 'linear-gradient(to bottom, #000428 0%, #004e92 50%, #009FFD 80%, #2A93D5 100%)',
      },
      default: {
        // For React Native, we'll use the base color
        backgroundColor: '#004e92',
      }
    }),
  },
  planetImage: {
    // Planet sized to fit within screen while maintaining aspect ratio
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
    // Ensure planet stays centered during rotation
    position: 'absolute',
  },
});

/**
 * Usage Example:
 * 
 * import RotatingBackground from './RotatingBackground';
 * 
 * <View style={{flex: 1}}>
 *   <RotatingBackground 
 *     source={require('./assets/planet.png')}
 *     opacity={0.15}
 *   />
 *   <YourMainContent />
 * </View>
 * 
 * Props:
 * - source: Image source (optional, defaults to hero-background.png)
 * - opacity: Image opacity (optional, defaults to 0.15)
 * 
 * Best Practices & Improvements:
 * 
 * 1. Performance: The image is sized 1.5x larger than screen to ensure
 *    full coverage during rotation without gaps at corners.
 * 
 * 2. Memory: For better performance on low-end devices, consider:
 *    - Using smaller image files
 *    - Implementing image caching
 *    - Adding a prop to disable animation on low-end devices
 * 
 * 3. Accessibility: The low opacity ensures content remains readable
 *    above the background.
 * 
 * 4. Responsiveness: Uses Dimensions API to adapt to screen size.
 *    Consider adding orientation change listener for better support.
 * 
 * 5. Web Compatibility: useNativeDriver is conditionally set based
 *    on platform to ensure web compatibility with Expo SDK 32.
 * 
 * 6. Customization: The component accepts props for image source
 *    and opacity, making it reusable across different screens.
 */