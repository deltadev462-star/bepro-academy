import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Platform, 
  StatusBar,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import all BePro Academy components
import HeroSection from './components/HeroSection';
import AnimatedStatements from './components/AnimatedStatements';
import PlatformFeatures from './components/PlatformFeatures';
import StatsSection from './components/StatsSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import TeamAndChat from './components/TeamAndChat';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Background gradient for the entire app */}
        <LinearGradient
          colors={['#000428', '#004e92', '#000428']}
          style={styles.backgroundGradient}
        />
        
        {/* Hero Section with Video Background */}
        <HeroSection />
        
        {/* Animated Statements Section */}
        <View style={styles.section}>
          <AnimatedStatements />
        </View>
        
        {/* Platform Features Section */}
        <View style={styles.section}>
          <PlatformFeatures />
        </View>
        
        {/* Stats Section */}
        <View style={styles.section}>
          <StatsSection />
        </View>
        
        {/* Contact Form Section */}
        <View style={styles.section}>
          <ContactForm />
        </View>
        
        {/* Footer Section */}
        <Footer />
      </ScrollView>
      
      {/* Floating Team Icons and Chatbot */}
      <TeamAndChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  section: {
    position: 'relative',
    zIndex: 1,
  },
});