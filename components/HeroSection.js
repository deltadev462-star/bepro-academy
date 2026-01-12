import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  Image
} from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    accountType: 'student' 
  });

  const handleLogin = () => {
    console.log('Login:', loginData);
    // Implement login logic
  };

  const handleRegister = () => {
    console.log('Register:', registerData);
    // Implement registration logic
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <Video
          source={{ uri: './assets/tinywow_02176818438403900000000000000000000ffffac14ab68de1c6b_87206537.mp4' }}
          rate={1.0}
          volume={0.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <ImageBackground
          source={{ uri: './assets/hero-background.png' }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.overlay} />
      
      {/* Auth Panel */}
      <ScrollView 
        style={styles.authSection}
        contentContainerStyle={styles.authContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.authContainer}>
          {/* Branding */}
          <View style={styles.branding}>
            <Text style={styles.brandTitle}>BEPRO-ACADEMY</Text>
            <Text style={styles.brandSubtitle}>Master Financial Markets Analysis</Text>
          </View>
          
          {/* Platform Badges */}
          <View style={styles.platformBadges}>
            <TouchableOpacity style={styles.badge}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' }}
                style={styles.badgeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.badge}>
              <Image 
                source={{ uri: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg' }}
                style={styles.badgeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          
          {/* Auth Header */}
          <View style={styles.authHeader}>
            <Text style={styles.authHeaderTitle}>
              {activeTab === 'login' ? 'Welcome Back' : 'Join BePro-Academy'}
            </Text>
            <Text style={styles.authHeaderSubtitle}>
              {activeTab === 'login' 
                ? 'Continue your journey in finance' 
                : 'Start your financial education today'}
            </Text>
          </View>
          
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'login' && styles.activeTab]}
              onPress={() => setActiveTab('login')}
            >
              <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'register' && styles.activeTab]}
              onPress={() => setActiveTab('register')}
            >
              <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Forms */}
          {activeTab === 'login' ? (
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={loginData.email}
                  onChangeText={(text) => setLoginData({...loginData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={loginData.password}
                  onChangeText={(text) => setLoginData({...loginData, password: text})}
                  secureTextEntry
                />
              </View>
              
              <TouchableOpacity onPress={handleLogin}>
                <LinearGradient
                  colors={['#009FFD', '#2A93D5']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Login to Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.accountTypeContainer}>
                <Text style={styles.label}>I am a:</Text>
                <View style={styles.accountTypes}>
                  <TouchableOpacity 
                    style={[
                      styles.typeOption,
                      registerData.accountType === 'student' && styles.activeTypeOption
                    ]}
                    onPress={() => setRegisterData({...registerData, accountType: 'student'})}
                  >
                    <Text style={styles.typeOptionEmoji}>📚</Text>
                    <Text style={styles.typeOptionText}>Student</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.typeOption,
                      registerData.accountType === 'academic' && styles.activeTypeOption
                    ]}
                    onPress={() => setRegisterData({...registerData, accountType: 'academic'})}
                  >
                    <Text style={styles.typeOptionEmoji}>🎓</Text>
                    <Text style={styles.typeOptionText}>Academic</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={registerData.email}
                  onChangeText={(text) => setRegisterData({...registerData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#999"
                  value={registerData.password}
                  onChangeText={(text) => setRegisterData({...registerData, password: text})}
                  secureTextEntry
                />
              </View>
              
              <TouchableOpacity onPress={handleRegister}>
                <LinearGradient
                  colors={['#009FFD', '#2A93D5']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
    minHeight: 600,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  authSection: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    width: 380,
    maxHeight: '90vh',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  authContent: {
    padding: 40,
  },
  authContainer: {
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  branding: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#009FFD',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 1,
  },
  platformBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
  },
  badge: {
    transform: [{ translateY: 0 }],
  },
  badgeImage: {
    height: 35,
    width: 120,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  authHeaderTitle: {
    fontSize: 24,
    color: '#000428',
    marginBottom: 8,
    fontWeight: '600',
  },
  authHeaderSubtitle: {
    color: '#666',
    fontSize: 15,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#009FFD',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000428',
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  accountTypeContainer: {
    marginBottom: 25,
  },
  accountTypes: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  typeOption: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  activeTypeOption: {
    borderColor: '#009FFD',
    backgroundColor: 'rgba(0, 159, 253, 0.05)',
  },
  typeOptionEmoji: {
    fontSize: 20,
  },
  typeOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HeroSection;