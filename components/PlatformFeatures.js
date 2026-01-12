import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const PlatformFeatures = () => {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.3)).current;
  const titleTranslateY = useRef(new Animated.Value(100)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const cardAnimations = useRef([...Array(6)].map(() => ({
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(50),
    scale: new Animated.Value(0.9)
  }))).current;

  useEffect(() => {
    // Title animation
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

    // Description animation
    Animated.timing(descOpacity, {
      toValue: 1,
      duration: 1200,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Cards animation
    cardAnimations.forEach((anim, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          })
        ]).start();
      }, 100 + (index * 100));
    });
  }, []);

  const features = [
    {
      icon: '📈',
      title: 'Market Analysis',
      description: 'Learn technical and fundamental analysis techniques used by professional traders. Master chart patterns, indicators, and market psychology.'
    },
    {
      icon: '💼',
      title: 'Trading Strategies',
      description: 'Develop winning strategies for forex, stocks, and cryptocurrency markets. Practice with real market data and simulation tools.'
    },
    {
      icon: '🎯',
      title: 'Risk Management',
      description: 'Master the art of protecting your capital with advanced risk management techniques. Learn position sizing, stop-loss strategies, and portfolio diversification.'
    },
    {
      icon: '📊',
      title: 'Financial Modeling',
      description: 'Build professional financial models for valuation, forecasting, and investment analysis. Excel, Python, and advanced modeling techniques.'
    },
    {
      icon: '🏆',
      title: 'Professional Certification',
      description: 'Earn industry-recognized certifications that validate your expertise. Stand out in the competitive finance job market.'
    },
    {
      icon: '👥',
      title: 'Expert Mentorship',
      description: 'Learn directly from successful traders and analysts. Get personalized feedback and guidance on your trading journey.'
    }
  ];

  const FeatureCard = ({ feature, index, animStyle }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const hoverScale = useRef(new Animated.Value(1)).current;
    const iconScale = useRef(new Animated.Value(1)).current;
    const iconRotate = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      setIsHovered(true);
      Animated.parallel([
        Animated.spring(hoverScale, {
          toValue: 1.05,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1.3,
          useNativeDriver: true,
        }),
        Animated.spring(iconRotate, {
          toValue: 10,
          useNativeDriver: true,
        })
      ]).start();
    };

    const handlePressOut = () => {
      setIsHovered(false);
      Animated.parallel([
        Animated.spring(hoverScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(iconRotate, {
          toValue: 0,
          useNativeDriver: true,
        })
      ]).start();
    };

    return (
      <Animated.View style={[
        styles.featureCard,
        animStyle,
        { transform: [{ scale: hoverScale }] }
      ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.cardContent}
        >
          <Animated.Text style={[
            styles.featureIcon,
            {
              transform: [
                { scale: iconScale },
                { rotate: iconRotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '1deg']
                }) }
              ]
            }
          ]}>
            {feature.icon}
          </Animated.Text>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern} />
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Animated.Text style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY }
              ]
            }
          ]}>
            Master Financial Markets Analysis
          </Animated.Text>
          
          <Animated.Text style={[styles.description, { opacity: descOpacity }]}>
            BePro-Academy is your gateway to professional financial education. 
            Learn from industry experts, gain practical skills, and transform 
            your career in finance.
          </Animated.Text>
        </View>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              animStyle={{
                opacity: cardAnimations[index].opacity,
                transform: [
                  { translateY: cardAnimations[index].translateY },
                  { scale: cardAnimations[index].scale }
                ]
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    width: '200%',
    height: '200%',
    top: '-50%',
    left: '-50%',
    opacity: 0.1,
    // Background pattern would be implemented with SVG or custom component
  },
  content: {
    padding: 20,
    paddingVertical: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -1,
    textAlign: 'center',
  },
  description: {
    fontSize: 21,
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: 800,
    lineHeight: 32,
    fontWeight: '300',
    letterSpacing: 1,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
  },
  featureCard: {
    backgroundColor: 'rgba(58, 58, 58, 0.8)',
    borderRadius: 16,
    padding: 40,
    width: screenWidth > 900 ? 360 : screenWidth > 600 ? '45%' : '100%',
    minHeight: 280,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    fontWeight: '300',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default PlatformFeatures;