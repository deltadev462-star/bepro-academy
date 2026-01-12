import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Import VideoBackground component
import VideoBackground from './VideoBackground';

class LoginRegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'login',
      accountType: 'student',
      rememberMe: false,
      // Form fields
      loginEmail: '',
      loginPassword: '',
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    };
  }

  switchTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleLogin = () => {
    console.log('Login with:', this.state.loginEmail, this.state.loginPassword);
    // Implement login logic here
  };

  handleRegister = () => {
    console.log('Register as:', this.state.accountType, this.state.registerName, this.state.registerEmail);
    // Implement registration logic here
  };

  render() {
    const { activeTab, accountType, rememberMe } = this.state;

    return (
      <View style={styles.container}>
        {/* Video Background Section (80%) */}
        <View style={styles.videoSection}>
          <VideoBackground
            source={{ uri: Platform.select({
              ios: 'https://example.com/planet-earth-video.mp4',
              android: 'https://example.com/planet-earth-video.mp4',
              web: './assets/tinywow_02176818438403900000000000000000000ffffac14ab68de1c6b_87206537.mp4'
            })}}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.videoOverlay} />
        </View>

        {/* Login/Register Panel (20%) */}
        <KeyboardAvoidingView 
          style={styles.authSection}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={styles.authContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Academy Branding */}
            <View style={styles.academyBranding}>
              <Text style={styles.brandingTitle}>BEPRO ACADEMY</Text>
              <Text style={styles.brandingSubtitle}>Master Financial Markets Analysis</Text>
            </View>

            {/* Platform Badges */}
            <View style={styles.platformBadges}>
              <TouchableOpacity style={styles.platformBadge}>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeIcon}>📱</Text>
                  <Text style={styles.badgeText}>Get it on{'\n'}Google Play</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.platformBadge}>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeIcon}>🍎</Text>
                  <Text style={styles.badgeText}>Download on the{'\n'}App Store</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.authHeader}>
              <Text style={styles.authTitle}>
                {activeTab === 'login' ? 'Welcome Back' : 'Join BePro Academy'}
              </Text>
              <Text style={styles.authSubtitle}>
                {activeTab === 'login'
                  ? 'Continue your journey in finance'
                  : 'Start your financial education today'}
              </Text>
            </View>

            {/* Tab Navigation */}
            <View style={styles.authTabs}>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'login' && styles.tabBtnActive]}
                onPress={() => this.switchTab('login')}
              >
                <Text style={[styles.tabBtnText, activeTab === 'login' && styles.tabBtnTextActive]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'register' && styles.tabBtnActive]}
                onPress={() => this.switchTab('register')}
              >
                <Text style={[styles.tabBtnText, activeTab === 'register' && styles.tabBtnTextActive]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Form */}
            {activeTab === 'login' && (
              <View style={styles.authForm}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={this.state.loginEmail}
                    onChangeText={(loginEmail) => this.setState({ loginEmail })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={this.state.loginPassword}
                    onChangeText={(loginPassword) => this.setState({ loginPassword })}
                    secureTextEntry
                  />
                </View>

                <View style={styles.rememberGroup}>
                  <TouchableOpacity 
                    style={styles.rememberCheck}
                    onPress={() => this.setState({ rememberMe: !rememberMe })}
                  >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.forgotLink}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={this.handleLogin}>
                  <Text style={styles.submitBtnText}>Login to Account</Text>
                </TouchableOpacity>

                <Text style={styles.divider}>or</Text>

                <View style={styles.authLinks}>
                  <Text style={styles.linkText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => this.switchTab('register')}>
                    <Text style={styles.linkAction}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <View style={styles.authForm}>
                <View style={styles.accountType}>
                  <Text style={styles.label}>I am a:</Text>
                  <View style={styles.typeOptions}>
                    <TouchableOpacity 
                      style={[styles.typeOption, accountType === 'student' && styles.typeOptionActive]}
                      onPress={() => this.setState({ accountType: 'student' })}
                    >
                      <Text style={styles.typeIcon}>📚</Text>
                      <Text style={[styles.typeText, accountType === 'student' && styles.typeTextActive]}>
                        Student
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.typeOption, accountType === 'academic' && styles.typeOptionActive]}
                      onPress={() => this.setState({ accountType: 'academic' })}
                    >
                      <Text style={styles.typeIcon}>🎓</Text>
                      <Text style={[styles.typeText, accountType === 'academic' && styles.typeTextActive]}>
                        Academic
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    value={this.state.registerName}
                    onChangeText={(registerName) => this.setState({ registerName })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={this.state.registerEmail}
                    onChangeText={(registerEmail) => this.setState({ registerEmail })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.formControl}
                    placeholder="Create a password"
                    placeholderTextColor="#999"
                    value={this.state.registerPassword}
                    onChangeText={(registerPassword) => this.setState({ registerPassword })}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={this.handleRegister}>
                  <Text style={styles.submitBtnText}>Create Account</Text>
                </TouchableOpacity>

                <Text style={styles.divider}>or</Text>

                <View style={styles.authLinks}>
                  <Text style={styles.linkText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => this.switchTab('login')}>
                    <Text style={styles.linkAction}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  // Video Background Section
  videoSection: {
    flex: 4, // 80% width
    backgroundColor: '#000',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Academy Branding
  academyBranding: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandingTitle: {
    fontSize: Platform.select({ web: 40, default: 32 }),
    fontWeight: '600',
    letterSpacing: 3,
    color: '#000428',
    marginBottom: 8,
  },
  brandingSubtitle: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 1,
  },
  // Platform Badges
  platformBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
  },
  platformBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    minWidth: 120,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  // Auth Section
  authSection: {
    flex: 1, // 20% width
    backgroundColor: '#fff',
    minWidth: Platform.select({ web: 380, default: 320 }),
    shadowColor: '#000',
    shadowOffset: { width: -10, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  authContainer: {
    padding: Platform.select({ web: 60, default: 40 }),
    justifyContent: 'center',
    minHeight: height,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 32,
    color: '#000428',
    fontWeight: '600',
    marginBottom: 10,
  },
  authSubtitle: {
    color: '#666',
    fontSize: 15,
  },
  // Tabs
  authTabs: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#009FFD',
    marginBottom: -2,
  },
  tabBtnText: {
    fontSize: 16,
    color: '#666',
  },
  tabBtnTextActive: {
    color: '#000428',
    fontWeight: '600',
  },
  // Forms
  authForm: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
  },
  formControl: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  // Account Type
  accountType: {
    marginBottom: 25,
  },
  typeOptions: {
    flexDirection: 'row',
    gap: 15,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  typeOptionActive: {
    borderColor: '#009FFD',
    backgroundColor: 'rgba(0,159,253,0.05)',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  typeText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#009FFD',
  },
  // Remember Me
  rememberGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#009FFD',
    borderColor: '#009FFD',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
  },
  rememberText: {
    color: '#666',
    fontSize: 14,
  },
  forgotLink: {
    color: '#009FFD',
    fontSize: 14,
  },
  // Submit Button
  submitBtn: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#009FFD',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Links
  divider: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  authLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkAction: {
    color: '#009FFD',
    fontSize: 14,
  }
});

export default LoginRegisterPage;