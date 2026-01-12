import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedStatements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  
  const statements = [
    {
      text: "Unlock your financial future with",
      highlight: "BePro-Academy",
      suffix: "'s expert-led courses."
    },
    {
      highlight: "BePro-Academy",
      suffix: " empowers you to master real-world market analysis skills."
    },
    {
      text: "Achieve your certification in finance and analysis—only at",
      highlight: "BePro-Academy",
      suffix: "."
    },
    {
      text: "Join",
      highlight: "BePro-Academy",
      suffix: "'s vibrant learning community and learn from top industry mentors."
    },
    {
      text: "Start your journey at",
      highlight: "BePro-Academy",
      suffix: " to become a financial analysis professional."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out and slide out current statement
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -50,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start(() => {
        // Update index
        setActiveIndex((prevIndex) => (prevIndex + 1) % statements.length);
        
        // Reset position and fade in new statement
        translateX.setValue(50);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          })
        ]).start();
      });
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [fadeAnim, translateX, statements.length]);

  const currentStatement = statements[activeIndex];

  // Generate particles for background
  const Particles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      const particleAnim = useRef(new Animated.Value(0)).current;
      
      useEffect(() => {
        Animated.loop(
          Animated.timing(particleAnim, {
            toValue: 1,
            duration: 20000 + Math.random() * 10000,
            useNativeDriver: true,
          })
        ).start();
      }, []);
      
      particles.push(
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              left: Math.random() * screenWidth,
              opacity: 0.3,
              transform: [{
                translateY: particleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, -100]
                })
              }]
            }
          ]}
        />
      );
    }
    return <>{particles}</>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.particlesContainer}>
        <Particles />
      </View>
      
      <Animated.View 
        style={[
          styles.statementContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX }]
          }
        ]}
      >
        <Text style={styles.statementText}>
          {currentStatement.text && (
            <Text>{currentStatement.text} </Text>
          )}
          <Text style={styles.highlight}>{currentStatement.highlight}</Text>
          <Text>{currentStatement.suffix}</Text>
        </Text>
      </Animated.View>
      
      <View style={styles.progressContainer}>
        {statements.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.progressDot,
              index === activeIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'web' ? 95 : 100, // 2.5cm approximate
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: 'rgba(0, 159, 253, 0.3)',
    borderRadius: 2,
  },
  statementContainer: {
    paddingHorizontal: 40,
    zIndex: 2,
  },
  statementText: {
    fontSize: 19,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 1,
    lineHeight: 26,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
    color: '#00D9FF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    gap: 6,
    zIndex: 3,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#00D9FF',
  },
});

export default AnimatedStatements;