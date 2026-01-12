import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  ImageBackground,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const StatsSection = () => {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.3)).current;
  const titleTranslateY = useRef(new Animated.Value(100)).current;
  
  const statAnimations = useRef([...Array(4)].map(() => ({
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8)
  }))).current;
  
  const featureAnimations = useRef([...Array(4)].map(() => ({
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(-50)
  }))).current;

  useEffect(() => {
    // Title animation with shimmer effect
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(titleScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      })
    ]).start();

    // Stats cards animation
    statAnimations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(anim.scale, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          })
        ]).start();
      }, 200 + (index * 200));
    });

    // Features animation
    featureAnimations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          })
        ]).start();
      }, 800 + (index * 150));
    });
  }, []);

  const stats = [
    { number: '250+', label: 'Active Students' },
    { number: '95%', label: 'Success Rate' },
    { number: '500+', label: 'Video Lessons' },
    { number: '24/7', label: 'Support Access' }
  ];

  const features = [
    'Live Trading Sessions',
    'Real Market Analysis',
    'Professional Certification',
    'Lifetime Access'
  ];

  const StatCard = ({ stat, animStyle }) => (
    <Animated.View style={[styles.statCard, animStyle]}>
      <LinearGradient
        colors={['#009FFD', '#2A93D5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.statNumberGradient}
      >
        <Text style={styles.statNumber}>{stat.number}</Text>
      </LinearGradient>
      <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
    </Animated.View>
  );

  const FeatureItem = ({ feature, animStyle }) => (
    <Animated.View style={[styles.featureItem, animStyle]}>
      <LinearGradient
        colors={['#009FFD', '#2A93D5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.checkmarkGradient}
      >
        <Text style={styles.checkmark}>✓</Text>
      </LinearGradient>
      <Text style={styles.featureText}>{feature}</Text>
    </Animated.View>
  );

  return (
    <ImageBackground
      source={{ uri: './assets/nanobana-generated.jpg.png' }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,4,40,0.7)', 'rgba(0,78,146,0.7)']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [
              { scale: titleScale },
              { translateY: titleTranslateY }
            ]
          }
        ]}>
          <Text style={styles.title}>
            Your Journey to Financial Excellence Starts Here with BePro-Academy
          </Text>
          <Animated.View style={styles.shimmer} />
        </Animated.View>
        
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              animStyle={{
                opacity: statAnimations[index].opacity,
                transform: [{ scale: statAnimations[index].scale }]
              }}
            />
          ))}
        </View>
        
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              animStyle={{
                opacity: featureAnimations[index].opacity,
                transform: [{ translateX: featureAnimations[index].translateX }]
              }}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
  },
  content: {
    padding: 20,
    paddingVertical: 80,
    alignItems: 'center',
  },
  titleContainer: {
    position: 'relative',
    marginBottom: 60,
  },
  title: {
    fontSize: screenWidth > 768 ? 64 : 36,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,217,255,0.3)',
    opacity: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 60,
    width: '100%',
    maxWidth: 1200,
  },
  statCard: {
    backgroundColor: '#808080',
    borderRadius: 20,
    padding: 40,
    minWidth: 250,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
  },
  statNumberGradient: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: 'transparent',
    // For gradient text effect, we'd use a custom component or SVG
  },
  statLabel: {
    fontSize: 17,
    color: '#000000',
    letterSpacing: 1,
    fontWeight: '800',
    fontFamily: 'Arial Black',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#808080',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    gap: 15,
  },
  checkmarkGradient: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '800',
    fontFamily: 'Arial Black',
  },
});

export default StatsSection;