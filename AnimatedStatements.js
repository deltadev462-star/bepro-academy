import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

class AnimatedStatements extends Component {
  constructor(props) {
    super(props);
    
    this.statements = [
      { text: "Unlock your financial future with ", highlight: "bepro-academy", rest: "'s expert-led courses." },
      { text: "", highlight: "Bepro-academy", rest: " empowers you to master real-world market analysis skills." },
      { text: "Achieve your certification in finance and analysis—only at ", highlight: "bepro-academy", rest: "." },
      { text: "Join ", highlight: "bepro-academy", rest: "'s vibrant learning community and learn from top industry mentors." },
      { text: "Start your journey at ", highlight: "bepro-academy", rest: " to become a financial analysis professional." }
    ];
    
    this.state = {
      currentIndex: 0
    };
    
    // Animation values
    this.fadeAnim = new Animated.Value(0);
    this.slideAnim = new Animated.Value(-50);
    this.progressAnims = this.statements.map(() => new Animated.Value(0));
  }
  
  componentDidMount() {
    this.startAnimation();
    this.interval = setInterval(() => {
      this.nextStatement();
    }, 10000);
  }
  
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  startAnimation = () => {
    const { currentIndex } = this.state;
    
    // Reset animations
    this.fadeAnim.setValue(0);
    this.slideAnim.setValue(-50);
    
    // Animate statement in
    Animated.parallel([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(this.slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
    
    // Animate progress dot
    Animated.timing(this.progressAnims[currentIndex], {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Schedule fade out
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(this.fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.slideAnim, {
          toValue: 50,
          duration: 500,
          useNativeDriver: true
        })
      ]).start();
    }, 9000);
  };
  
  nextStatement = () => {
    const { currentIndex } = this.state;
    
    // Reset current progress dot
    Animated.timing(this.progressAnims[currentIndex], {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Move to next statement
    const nextIndex = (currentIndex + 1) % this.statements.length;
    this.setState({ currentIndex: nextIndex }, () => {
      this.startAnimation();
    });
  };
  
  renderStatement = () => {
    const { currentIndex } = this.state;
    const statement = this.statements[currentIndex];
    
    return (
      <Animated.View
        style={[
          styles.statementContainer,
          {
            opacity: this.fadeAnim,
            transform: [{ translateX: this.slideAnim }]
          }
        ]}
      >
        <Text style={styles.statement}>
          {statement.text}
          <Text style={styles.highlight}>{statement.highlight}</Text>
          {statement.rest}
        </Text>
      </Animated.View>
    );
  };
  
  renderProgressDots = () => {
    return (
      <View style={styles.progressContainer}>
        {this.statements.map((_, index) => {
          const isActive = index === this.state.currentIndex;
          const animatedWidth = this.progressAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [8, 30]
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.progressDot,
                isActive && styles.progressDotActive,
                {
                  width: isActive ? animatedWidth : 8
                }
              ]}
            />
          );
        })}
      </View>
    );
  };
  
  render() {
    return (
      <View style={styles.container}>
        {/* Background Gradient */}
        <View style={styles.backgroundGradient} />
        
        {/* Glow Effects */}
        <View style={[styles.glowOrb, styles.glowOrb1]} />
        <View style={[styles.glowOrb, styles.glowOrb2]} />
        
        {/* Statement */}
        {this.renderStatement()}
        
        {/* Progress Indicators */}
        {this.renderProgressDots()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.select({ web: 189, default: 150 }), // 5cm ≈ 189px
    backgroundColor: '#000428',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000428',
    opacity: 0.9
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 217, 255, 0.1)'
  },
  glowOrb1: {
    top: -150,
    left: -100
  },
  glowOrb2: {
    bottom: -150,
    right: -100
  },
  statementContainer: {
    paddingHorizontal: 40,
    maxWidth: 1200,
    width: '100%'
  },
  statement: {
    fontSize: Platform.select({ web: 28, default: 22 }),
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: Platform.select({ web: 40, default: 32 })
  },
  highlight: {
    fontWeight: '700',
    color: '#00D9FF',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  progressContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4
  },
  progressDotActive: {
    backgroundColor: '#00D9FF'
  }
});

export default AnimatedStatements;