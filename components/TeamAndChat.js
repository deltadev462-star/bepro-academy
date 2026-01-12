import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TeamAndChat = () => {
  // Team states
  const [activePopup, setActivePopup] = useState(null);
  
  // Chat states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! 👋 Welcome to BePro-Academy!", sender: 'bot', time: 'Just now' },
    { id: 2, text: "I'm here to help you explore our financial education programs. What would you like to know?", sender: 'bot', time: 'Just now' }
  ]);
  const [inputText, setInputText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Animations
  const chatButtonScale = useRef(new Animated.Value(1)).current;
  const notificationScale = useRef(new Animated.Value(0)).current;
  const chatWindowScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show notification after 5 seconds
    setTimeout(() => {
      setShowNotification(true);
      Animated.spring(notificationScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 5000);

    // Pulse animation for chat button
    Animated.loop(
      Animated.sequence([
        Animated.timing(chatButtonScale, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(chatButtonScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    setShowNotification(false);
    
    if (!chatOpen) {
      Animated.spring(chatWindowScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(chatWindowScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: getCurrentTime()
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const response = generateBotResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('course') || lowerMessage.includes('program')) {
      return "We offer comprehensive courses in:\n\n📈 Technical Analysis\n💼 Trading Strategies\n🎯 Risk Management\n📊 Financial Modeling\n\nEach course includes video lessons, practical exercises, and expert mentorship!";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "We have flexible pricing options:\n\n• Basic Plan: $99/month\n• Pro Plan: $199/month\n• Lifetime Access: $999\n\nAll plans include certification and lifetime updates!";
    } else if (lowerMessage.includes('certif')) {
      return "Our certifications are industry-recognized and include:\n\n🏆 Certified Market Analyst\n🏆 Professional Trader Certificate\n🏆 Risk Management Specialist\n\nThese credentials will boost your finance career!";
    } else if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return "Getting started is easy!\n\n1. Click 'Sign Up' to create your account\n2. Choose your learning path\n3. Start with our free introduction course\n4. Progress at your own pace\n\nWould you like me to guide you to the registration?";
    } else if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "We provide 24/7 support through:\n\n📧 Email: info@bepro-academy.com\n💬 Live chat (you're using it now!)\n👥 Community forums\n\nHow can I assist you today?";
    } else {
      return "Thanks for your question! Our courses cover everything from basic market analysis to advanced trading strategies. What specific aspect of financial education interests you most?";
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const teamMembers = {
    mohammed: {
      name: 'Mohammed',
      title: 'Senior Academic Lecturer & Financial Data Analysis Expert',
      badge: 'Global Expert',
      emoji: '👨‍🏫',
      whatsapp: '+201035801035',
      about: 'Mohammed is a world-renowned academic lecturer with exceptional expertise in company, financial, and stock data analysis. With decades of experience in both academic and professional spheres, he has established himself as a leading authority in financial markets analysis and economic data interpretation.',
      expertise: [
        { icon: '📊', name: 'Financial Data Analysis' },
        { icon: '💹', name: 'Stock Market Analytics' },
        { icon: '🏢', name: 'Company Valuation' },
        { icon: '📈', name: 'Economic Data Interpretation' },
        { icon: '🎯', name: 'Risk Assessment' },
        { icon: '🔍', name: 'Market Research' }
      ],
      achievements: [
        'Delivered keynote presentations at over 50 international financial conferences',
        'Guest lecturer at leading universities including Harvard, Oxford, and MIT',
        'Published 30+ peer-reviewed papers on financial markets analysis',
        'Conducted specialized workshops for Fortune 500 companies',
        'Mentored 1000+ professionals in advanced financial data analysis',
        'Recipient of the Global Excellence Award in Financial Education (2023)'
      ]
    },
    abdullah: {
      name: 'Abdullah',
      title: 'CEO & Platform Administrator',
      badge: 'BePro-Academy Leader',
      emoji: '👨‍💼',
      phone: '+966538751281',
      about: 'Abdullah is the visionary CEO and Platform Administrator of BePro-Academy. With a passion for democratizing financial education, he has built a world-class platform that connects top educators with ambitious learners globally.',
      vision: 'Under Abdullah\'s leadership, BePro-Academy has become a premier destination for financial education, offering cutting-edge courses, expert mentorship, and industry-recognized certifications. His commitment to excellence ensures every student receives the highest quality educational experience.'
    }
  };

  const TeamIcon = ({ member, type }) => (
    <TouchableOpacity 
      style={[styles.teamButton, type === 'mohammed' ? styles.mohammedButton : styles.abdullahButton]}
      onPress={() => setActivePopup(type)}
    >
      <Text style={styles.teamEmoji}>{member.emoji}</Text>
      <View style={styles.teamTooltip}>
        <Text style={styles.tooltipText}>
          {type === 'mohammed' ? 'Expert Instructor' : 'CEO'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const TeamPopup = ({ member, type, visible, onClose }) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.popupOverlay} 
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.popupContainer}>
          <LinearGradient
            colors={type === 'mohammed' ? ['#009FFD', '#2A93D5'] : ['#FFD700', '#FFA500']}
            style={styles.popupHeader}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.popupContent}>
            <View style={styles.memberHeader}>
              <View style={[styles.memberAvatar, type === 'abdullah' && styles.ceoAvatar]}>
                <Text style={styles.avatarEmoji}>{member.emoji}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberTitle}>{member.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{member.badge}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.popupSection}>
              <Text style={styles.sectionTitle}>📖 About</Text>
              <Text style={styles.sectionText}>{member.about}</Text>
            </View>
            
            {type === 'mohammed' && (
              <>
                <View style={styles.popupSection}>
                  <Text style={styles.sectionTitle}>💡 Areas of Expertise</Text>
                  <View style={styles.expertiseGrid}>
                    {member.expertise.map((item, index) => (
                      <View key={index} style={styles.expertiseCard}>
                        <Text style={styles.expertiseIcon}>{item.icon}</Text>
                        <Text style={styles.expertiseText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.popupSection}>
                  <Text style={styles.sectionTitle}>🏆 Key Achievements</Text>
                  {member.achievements.map((achievement, index) => (
                    <View key={index} style={styles.achievementItem}>
                      <Text style={styles.achievementIcon}>🏆</Text>
                      <Text style={styles.achievementText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            
            {type === 'abdullah' && member.vision && (
              <View style={styles.popupSection}>
                <Text style={styles.sectionTitle}>🎯 Leadership Vision</Text>
                <Text style={styles.sectionText}>{member.vision}</Text>
              </View>
            )}
            
            <View style={styles.popupSection}>
              <Text style={styles.sectionTitle}>📞 Contact</Text>
              {member.whatsapp && (
                <Text style={[styles.contactText, styles.whatsapp]}>
                  💬 WhatsApp: {member.whatsapp}
                </Text>
              )}
              {member.phone && (
                <Text style={styles.contactText}>
                  📱 Direct: {member.phone}
                </Text>
              )}
              <Text style={styles.contactText}>
                📧 Email: info@bepro-academy.com
              </Text>
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <>
      {/* Team Icons */}
      <View style={styles.teamIcons}>
        <TeamIcon member={teamMembers.mohammed} type="mohammed" />
        <TeamIcon member={teamMembers.abdullah} type="abdullah" />
      </View>

      {/* Team Popups */}
      <TeamPopup
        member={teamMembers.mohammed}
        type="mohammed"
        visible={activePopup === 'mohammed'}
        onClose={() => setActivePopup(null)}
      />
      <TeamPopup
        member={teamMembers.abdullah}
        type="abdullah"
        visible={activePopup === 'abdullah'}
        onClose={() => setActivePopup(null)}
      />

      {/* Chatbot */}
      <View style={styles.chatbotWidget}>
        <Animated.View style={{ transform: [{ scale: chatButtonScale }] }}>
          <TouchableOpacity style={styles.chatbotButton} onPress={toggleChat}>
            {showNotification && !chatOpen && (
              <Animated.View style={[
                styles.notification,
                { transform: [{ scale: notificationScale }] }
              ]}>
                <Text style={styles.notificationText}>1</Text>
              </Animated.View>
            )}
            {chatOpen ? (
              <Text style={styles.chatIcon}>✕</Text>
            ) : (
              <Text style={styles.chatIcon}>💬</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {chatOpen && (
          <Animated.View style={[
            styles.chatWindow,
            { 
              transform: [{ scale: chatWindowScale }],
              opacity: chatWindowScale
            }
          ]}>
            <LinearGradient
              colors={['#009FFD', '#00D9FF']}
              style={styles.chatHeader}
            >
              <View style={styles.botAvatar}>
                <Text style={styles.botEmoji}>🤖</Text>
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatTitle}>BePro Assistant</Text>
                <Text style={styles.chatSubtitle}>Always here to help</Text>
              </View>
            </LinearGradient>

            <ScrollView style={styles.chatMessages}>
              {messages.map(message => (
                <View 
                  key={message.id} 
                  style={[
                    styles.message, 
                    message.sender === 'bot' ? styles.botMessage : styles.userMessage
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
              ))}
              {isTyping && (
                <View style={[styles.message, styles.botMessage]}>
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDot} />
                    <View style={[styles.typingDot, styles.typingDot2]} />
                    <View style={[styles.typingDot, styles.typingDot3]} />
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.quickReplies}>
              <TouchableOpacity 
                style={styles.quickReply}
                onPress={() => setInputText('Tell me about courses')}
              >
                <Text style={styles.quickReplyText}>📚 Course Info</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickReply}
                onPress={() => setInputText('What certifications do you offer?')}
              >
                <Text style={styles.quickReplyText}>🏆 Certifications</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickReply}
                onPress={() => setInputText('Show pricing options')}
              >
                <Text style={styles.quickReplyText}>💰 Pricing</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickReply}
                onPress={() => setInputText('How do I get started?')}
              >
                <Text style={styles.quickReplyText}>🚀 Get Started</Text>
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.chatInputContainer}
            >
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <LinearGradient
                  colors={['#009FFD', '#00D9FF']}
                  style={styles.sendButtonGradient}
                >
                  <Text style={styles.sendIcon}>➤</Text>
                </LinearGradient>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animated.View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Team Icons Styles
  teamIcons: {
    position: 'absolute',
    bottom: 110,
    right: 30,
    zIndex: 9998,
    gap: 15,
  },
  teamButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 3,
    marginBottom: 15,
  },
  mohammedButton: {
    borderColor: '#009FFD',
  },
  abdullahButton: {
    borderColor: '#FFD700',
  },
  teamEmoji: {
    fontSize: 30,
  },
  teamTooltip: {
    position: 'absolute',
    right: 70,
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    opacity: 0,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },

  // Popup Styles
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '90%',
    maxWidth: 700,
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  popupHeader: {
    padding: 30,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 20,
  },
  popupContent: {
    padding: 30,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 30,
  },
  memberAvatar: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#009FFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ceoAvatar: {
    backgroundColor: '#FFD700',
  },
  avatarEmoji: {
    fontSize: 60,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000428',
    marginBottom: 10,
  },
  memberTitle: {
    fontSize: 17,
    color: '#666',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  popupSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000428',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
  },
  expertiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  expertiseCard: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expertiseIcon: {
    fontSize: 20,
  },
  expertiseText: {
    fontSize: 15,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 30,
    position: 'relative',
  },
  achievementIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 20,
  },
  achievementText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    flex: 1,
  },
  contactText: {
    fontSize: 18,
    marginBottom: 10,
  },
  whatsapp: {
    color: '#25D366',
    fontWeight: '600',
  },

  // Chatbot Styles
  chatbotWidget: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 9997,
  },
  chatbotButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#009FFD',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#009FFD',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  chatIcon: {
    color: 'white',
    fontSize: 30,
  },
  notification: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatWindow: {
    position: 'absolute',
    bottom: 85,
    right: 0,
    width: 380,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'hidden',
  },
  chatHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  botAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  botEmoji: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#009FFD',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  chatSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  chatMessages: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  message: {
    marginBottom: 15,
    maxWidth: '75%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageText: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 18,
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    marginHorizontal: 12,
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 18,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
  },
  typingDot2: {
    animationDelay: '0.2s',
  },
  typingDot3: {
    animationDelay: '0.4s',
  },
  quickReplies: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
  },
  quickReply: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quickReplyText: {
    fontSize: 13,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    gap: 10,
  },
  chatInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 25,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    color: 'white',
    fontSize: 20,
  },
});

export default TeamAndChat;