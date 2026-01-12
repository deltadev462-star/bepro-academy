import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Picker,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const subjects = [
    { value: '', label: 'Select a topic' },
    { value: 'course-types', label: 'Course Types & Content' },
    { value: 'pricing', label: 'Pricing & Payment Options' },
    { value: 'schedule', label: 'Schedule & Duration' },
    { value: 'certification', label: 'Certification Details' },
    { value: 'prerequisites', label: 'Prerequisites & Requirements' },
    { value: 'other', label: 'Other Questions' }
  ];

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Required Fields', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Message Sent!',
      `Thank you ${formData.fullName}! We've received your inquiry about "${subjects.find(s => s.value === formData.subject)?.label}" and will contact you at ${formData.email} soon.`
    );
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const ContactMethod = ({ icon, text }) => (
    <View style={styles.contactMethod}>
      <Text style={styles.contactMethodIcon}>{icon}</Text>
      <Text style={styles.contactMethodText}>{text}</Text>
    </View>
  );

  const SocialLink = ({ emoji, title }) => (
    <TouchableOpacity style={styles.socialLink}>
      <Text style={styles.socialEmoji}>{emoji}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: './assets/hero-background.png' }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,4,40,0.85)', 'rgba(0,78,146,0.85)']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Get in Touch</Text>
            <Text style={styles.subtitle}>
              Have questions about our courses, pricing, or anything else? We're here to help!
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <View style={styles.formRow}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#999"
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({...formData, fullName: text})}
                />
              </View>
              
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+1 234 567 8900"
                  placeholderTextColor="#999"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({...formData, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="john@example.com"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>What would you like to know? *</Text>
              {Platform.OS === 'web' ? (
                <select
                  style={[styles.input, styles.select]}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  {subjects.map(subject => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              ) : (
                <View style={[styles.input, styles.pickerContainer]}>
                  <Picker
                    selectedValue={formData.subject}
                    onValueChange={(value) => setFormData({...formData, subject: value})}
                    style={styles.picker}
                  >
                    {subjects.map(subject => (
                      <Picker.Item 
                        key={subject.value} 
                        label={subject.label} 
                        value={subject.value} 
                      />
                    ))}
                  </Picker>
                </View>
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Message *</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Please tell us more about your inquiry..."
                placeholderTextColor="#999"
                value={formData.message}
                onChangeText={(text) => setFormData({...formData, message: text})}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                colors={['#009FFD', '#2A93D5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactInfoTitle}>Or reach us directly</Text>
            <View style={styles.contactMethods}>
              <ContactMethod 
                icon="📧" 
                text="info@bepro-academy.com" 
              />
              <ContactMethod 
                icon="💬" 
                text="Live Chat Available" 
              />
            </View>
            
            <View style={styles.socialSection}>
              <Text style={styles.socialTitle}>Follow us on social media</Text>
              <View style={styles.socialLinks}>
                <SocialLink emoji="📘" title="Facebook" />
                <SocialLink emoji="📺" title="YouTube" />
                <SocialLink emoji="📷" title="Instagram" />
                <SocialLink emoji="👻" title="Snapchat" />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    paddingVertical: 80,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 56,
    color: '#fff',
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 19,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 28,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 60,
    elevation: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25,
  },
  formGroup: {
    marginBottom: 25,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  select: {
    height: 50,
  },
  pickerContainer: {
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
  },
  textarea: {
    height: 150,
    paddingTop: 15,
  },
  submitButton: {
    width: '100%',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  contactInfo: {
    marginTop: 60,
    alignItems: 'center',
  },
  contactInfoTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  contactMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 40,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  contactMethodIcon: {
    fontSize: 24,
    color: '#00D9FF',
  },
  contactMethodText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 17,
  },
  socialSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  socialLink: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialEmoji: {
    fontSize: 24,
  },
});

export default ContactForm;