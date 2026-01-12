import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'About BePro-Academy', href: '#about' },
      { label: 'Our Courses', href: '#courses' },
      { label: 'Certification Program', href: '#certification' },
      { label: 'Success Stories', href: '#testimonials' }
    ],
    resources: [
      { label: 'Trading Guides', href: '#guides' },
      { label: 'Market Analysis', href: '#analysis' },
      { label: 'Webinars', href: '#webinars' },
      { label: 'Blog', href: '#blog' }
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Community Forum', href: '#forum' },
      { label: 'FAQs', href: '#faqs' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Risk Disclosure', href: '#risk' }
    ]
  };

  const socialLinks = [
    { icon: '📘', label: 'Facebook', href: 'https://facebook.com/beproacademy' },
    { icon: '🐦', label: 'Twitter', href: 'https://twitter.com/beproacademy' },
    { icon: '📷', label: 'Instagram', href: 'https://instagram.com/beproacademy' },
    { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/company/beproacademy' },
    { icon: '📺', label: 'YouTube', href: 'https://youtube.com/beproacademy' }
  ];

  return (
    <LinearGradient
      colors={['#1a1a1a', '#0a0a0a']}
      style={styles.footer}
    >
      <View style={styles.container}>
        {/* Main Footer Content */}
        <View style={styles.mainFooter}>
          {/* Company Info */}
          <View style={styles.companySection}>
            <LinearGradient
              colors={['#009FFD', '#00D9FF']}
              style={styles.logoGradient}
            >
              <Text style={styles.logoText}>BePro</Text>
            </LinearGradient>
            <Text style={styles.companyName}>BePro-Academy</Text>
            <Text style={styles.tagline}>
              Empowering Financial Excellence Through Expert Education
            </Text>
            <Text style={styles.description}>
              Your premier destination for comprehensive financial education, 
              professional trading strategies, and industry-recognized certifications.
            </Text>
            
            {/* Social Links */}
            <View style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialButton}
                  onPress={() => Platform.OS === 'web' && window.open(social.href, '_blank')}
                >
                  <Text style={styles.socialIcon}>{social.icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Links Grid */}
          <View style={styles.linksGrid}>
            {/* Platform Links */}
            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Platform</Text>
              {footerLinks.platform.map((link, index) => (
                <TouchableOpacity key={index} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Resources Links */}
            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Resources</Text>
              {footerLinks.resources.map((link, index) => (
                <TouchableOpacity key={index} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Support Links */}
            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Support</Text>
              {footerLinks.support.map((link, index) => (
                <TouchableOpacity key={index} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Legal Links */}
            <View style={styles.linkColumn}>
              <Text style={styles.columnTitle}>Legal</Text>
              {footerLinks.legal.map((link, index) => (
                <TouchableOpacity key={index} style={styles.linkItem}>
                  <Text style={styles.linkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Newsletter Section */}
        <View style={styles.newsletterSection}>
          <LinearGradient
            colors={['rgba(0, 159, 253, 0.1)', 'rgba(0, 217, 255, 0.1)']}
            style={styles.newsletterGradient}
          >
            <View style={styles.newsletterContent}>
              <View style={styles.newsletterInfo}>
                <Text style={styles.newsletterTitle}>
                  📧 Stay Updated with Market Insights
                </Text>
                <Text style={styles.newsletterText}>
                  Get weekly trading tips, market analysis, and exclusive educational content
                </Text>
              </View>
              <TouchableOpacity style={styles.subscribeButton}>
                <LinearGradient
                  colors={['#009FFD', '#00D9FF']}
                  style={styles.subscribeGradient}
                >
                  <Text style={styles.subscribeText}>Subscribe Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.copyright}>
            © {currentYear} BePro-Academy. All rights reserved.
          </Text>
          <View style={styles.bottomLinks}>
            <TouchableOpacity>
              <Text style={styles.bottomLink}>Sitemap</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>•</Text>
            <TouchableOpacity>
              <Text style={styles.bottomLink}>Accessibility</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>•</Text>
            <TouchableOpacity>
              <Text style={styles.bottomLink}>Partners</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trading Risk Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ Trading involves substantial risk and is not suitable for all investors. 
            Past performance is not indicative of future results. 
            Educational content is for informational purposes only.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingTop: 80,
    paddingBottom: 20,
  },
  container: {
    paddingHorizontal: Platform.OS === 'web' ? '10%' : 20,
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  mainFooter: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 60,
    marginBottom: 60,
  },
  companySection: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    marginBottom: Platform.OS === 'web' ? 0 : 40,
  },
  logoGradient: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  companyName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#00D9FF',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 30,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialIcon: {
    fontSize: 20,
  },
  linksGrid: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flex: Platform.OS === 'web' ? 2 : undefined,
    gap: Platform.OS === 'web' ? 60 : 30,
  },
  linkColumn: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
  },
  linkItem: {
    marginBottom: 12,
  },
  linkText: {
    fontSize: 15,
    color: '#aaa',
  },
  newsletterSection: {
    marginBottom: 40,
  },
  newsletterGradient: {
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 159, 253, 0.3)',
  },
  newsletterContent: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },
  newsletterInfo: {
    flex: 1,
  },
  newsletterTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  newsletterText: {
    fontSize: 15,
    color: '#ccc',
  },
  subscribeButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  subscribeGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  subscribeText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bottomBar: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyright: {
    fontSize: 14,
    color: '#888',
    marginBottom: Platform.OS === 'web' ? 0 : 10,
  },
  bottomLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomLink: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    color: '#666',
  },
  disclaimer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  disclaimerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default Footer;