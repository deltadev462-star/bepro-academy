import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import VideoBackground from './VideoBackground';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Hero Section Component
class HeroSection extends Component {
  render() {
    return (
      <View style={styles.heroContainer}>
        <VideoBackground />
        <View style={styles.heroContent}>
          <Text style={styles.heroHeadline}>
            Master Financial Markets Analysis
          </Text>
          <Text style={styles.heroDescription}>
            Join BePro Academy and become a professional financial analyst with real-world market insights
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Start Learning Today</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Features Card Section Component with Animation
class FeaturesCard extends Component {
  constructor(props) {
    super(props);
    // Animation values for each feature
    this.fadeAnim = new Animated.Value(0);
    this.slideAnim = new Animated.Value(50);
    this.scaleAnim = new Animated.Value(0.8);
  }

  componentDidMount() {
    // Start entrance animation
    Animated.parallel([
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(this.slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(this.scaleAnim, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        easing: Easing.elastic(1),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }

  render() {
    const animatedStyle = {
      opacity: this.fadeAnim,
      transform: [
        { translateY: this.slideAnim },
        { scale: this.scaleAnim },
      ],
    };

    return (
      <Animated.View style={[styles.featuresCard, animatedStyle]}>
        <View style={styles.brandSection}>
          <Text style={styles.brandName}>BePro Academy</Text>
          <Text style={styles.brandTagline}>Master Financial Markets Analysis</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.featuresSection}>
          <Text style={styles.featureHighlight}>📊 Real-Time Market Analysis</Text>
          <Text style={styles.featureSeparator}>•</Text>
          <Text style={styles.featureHighlight}>💹 Professional Trading</Text>
          <Text style={styles.featureSeparator}>•</Text>
          <Text style={styles.featureHighlight}>🎓 Expert Certification</Text>
        </View>
      </Animated.View>
    );
  }
}

// Video Background Section Component
class VideoSection extends Component {
  render() {
    // For React Native Web compatibility, we'll use an image placeholder
    // In a real app, you'd use expo-av or react-native-video-controls
    return (
      <View style={styles.videoSection}>
        <Image
          source={require('./assets/video-placeholder.jpg')}
          style={styles.videoBackground}
          resizeMode="cover"
        />
        <View style={styles.videoOverlay}>
          <Text style={styles.videoHeadline}>
            Start Your Journey in Financial Markets
          </Text>
          <Text style={styles.videoSubtext}>
            Join BePro Academy's community of successful financial analysts
          </Text>
          <TouchableOpacity style={styles.videoCtaButton}>
            <Text style={styles.videoCtaButtonText}>Explore Courses</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// Testimonials Section Component
class TestimonialsSection extends Component {
  render() {
    const testimonials = [
      {
        name: 'Ahmed Hassan',
        role: 'Senior Financial Analyst at QNB',
        quote: 'BePro Academy gave me the edge in financial markets analysis. The practical trading strategies transformed my career.',
        avatar: require('./assets/avatar-1.jpg'),
      },
      {
        name: 'Sara El-Sharkawy',
        role: 'Investment Analyst at EFG Hermes',
        quote: 'The technical analysis courses at BePro Academy are unmatched. I now confidently analyze market trends and make profitable decisions.',
        avatar: require('./assets/avatar-2.jpg'),
      },
      {
        name: 'Mohamed Khaled',
        role: 'Portfolio Manager at ADIB',
        quote: 'BePro Academy\'s real-time market analysis training helped me secure a senior position in just 4 months.',
        avatar: require('./assets/avatar-3.jpg'),
      },
    ];

    return (
      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>What Our Students Say</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.testimonialsScroll}
        >
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.testimonialCard}>
              <Image source={testimonial.avatar} style={styles.avatar} />
              <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
              <Text style={styles.testimonialName}>{testimonial.name}</Text>
              <Text style={styles.testimonialRole}>{testimonial.role}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

// Footer Component
class Footer extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>BePro Academy</Text>
            <Text style={styles.footerText}>
              Your gateway to professional financial markets analysis and trading excellence
            </Text>
          </View>
          
          <View style={styles.footerSection}>
            <Text style={styles.footerSubtitle}>Contact</Text>
            <Text style={styles.footerLink}>contact@bepro.academy</Text>
            <Text style={styles.footerLink}>+20 100 123 4567</Text>
          </View>
          
          <View style={styles.footerSection}>
            <Text style={styles.footerSubtitle}>Follow Us</Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>f</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>tw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            © 2024 BePro Academy. All rights reserved.
          </Text>
        </View>
      </View>
    );
  }
}

// Main Landing Page Component
export default class LandingPage extends Component {
  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeroSection />
        <FeaturesCard />
        <VideoSection />
        <TestimonialsSection />
        <Footer />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Hero Section Styles
  heroContainer: {
    height: screenHeight,
    width: screenWidth,
    position: 'relative',
    backgroundColor: '#000428', // Deep space background color
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  heroHeadline: {
    fontSize: Platform.OS === 'web' ? 48 : 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  heroDescription: {
    fontSize: Platform.OS === 'web' ? 20 : 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 28,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  ctaButton: {
    backgroundColor: '#007AFF', // Changed back to blue for better contrast
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  
  // Features Card Styles - 4cm height (151px)
  featuresCard: {
    backgroundColor: '#ffffff',
    height: 151, // 4cm at 96dpi
    marginTop: -75, // Overlap hero section
    marginHorizontal: Platform.OS === 'web' ? 60 : 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    overflow: 'hidden',
  },
  brandSection: {
    flex: 1,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000428',
    marginBottom: 4,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  brandTagline: {
    fontSize: 16,
    color: '#666',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  divider: {
    width: 2,
    height: '60%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 30,
  },
  featuresSection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  featureHighlight: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  featureSeparator: {
    fontSize: 20,
    color: '#009FFD',
    fontWeight: 'bold',
  },
  
  // Video Section Styles
  videoSection: {
    height: screenHeight * 0.7,
    marginTop: 60,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a', // Dark tech background
  },
  videoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  videoHeadline: {
    fontSize: Platform.OS === 'web' ? 42 : 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  videoSubtext: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  videoCtaButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  videoCtaButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  
  // Testimonials Section Styles
  testimonialsSection: {
    paddingVertical: 80,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 36 : 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 50,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  testimonialsScroll: {
    paddingHorizontal: 20,
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    marginRight: 20,
    width: Platform.OS === 'web' ? 350 : 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  testimonialQuote: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'web' ? 'Georgia, serif' : 'System',
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  testimonialRole: {
    fontSize: 14,
    color: '#777777',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  
  // Footer Styles
  footer: {
    backgroundColor: '#1a1a1a',
    paddingTop: 60,
  },
  footerContent: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  footerSection: {
    marginBottom: Platform.OS === 'web' ? 0 : 30,
    flex: Platform.OS === 'web' ? 1 : undefined,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  footerSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  footerText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 22,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  footerLink: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  socialLinks: {
    flexDirection: 'row',
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  socialIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: '#999999',
    fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System',
  },
});