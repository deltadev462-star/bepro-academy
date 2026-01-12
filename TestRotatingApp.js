import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RotatingBackground from './RotatingBackground';

export default function TestRotatingApp() {
  return (
    <View style={styles.container}>
      {/* Rotating Background */}
      <RotatingBackground
        source={require('./assets/hero-background.png')}
        opacity={1}
      />
      
      {/* Content on top */}
      <View style={styles.content}>
        <Text style={styles.title}>BePro Academy</Text>
        <Text style={styles.subtitle}>Rotating Background Demo</Text>
        <Text style={styles.description}>
          The background image is rotating continuously behind this text.
          The rotation is smooth and infinite.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000428', // Deep space background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
});