# Educational Platform Landing Page - React Native

A modern, responsive landing page built with React Native for Expo SDK 32, compatible with React Native Web.

## Features

- 🎨 **Modern Design**: Professional layout with stunning visual elements
- 📱 **Fully Responsive**: Optimized for web and mobile platforms  
- 🎥 **Video Background Section**: Engaging multimedia experience
- 💬 **Testimonials**: Social proof with horizontal scroll
- ✨ **Smooth Interactions**: Hover effects and transitions

## Project Structure

```
├── App.js              # Main app entry point
├── LandingPage.js      # Complete landing page component
└── assets/            # Image and video placeholders (to be added)
    ├── hero-background.jpg
    ├── video-placeholder.jpg  
    ├── avatar-1.jpg
    ├── avatar-2.jpg
    └── avatar-3.jpg
```

## Required Assets

Create an `assets` folder in your project root and add the following placeholder images:

1. **hero-background.jpg** - Hero section background (1920x1080 recommended)
2. **video-placeholder.jpg** - Video section background (1920x1080 recommended)
3. **avatar-1.jpg**, **avatar-2.jpg**, **avatar-3.jpg** - Testimonial avatars (200x200)

## Installation & Usage

1. **For Expo SDK 32 Projects**:
   ```bash
   # Copy LandingPage.js and App.js to your project
   # Add required assets to assets/ folder
   # Run your Expo project
   expo start
   ```

2. **For Web Deployment**:
   ```bash
   expo build:web
   ```

## Component Breakdown

### HeroSection
- Full-screen hero with background image
- Overlay with headline, description, and CTA button
- Responsive typography scaling

### FeaturesCard
- Floating card with shadow effect
- Four key platform features with emoji icons
- Responsive flexbox layout

### VideoSection  
- Background image placeholder (replace with video component)
- Text overlay with transparent border button
- Darkened overlay for readability

### TestimonialsSection
- Horizontal scrolling testimonial cards
- Avatar images and quote formatting
- Touch-optimized for mobile

### Footer
- Three-column layout on web, stacked on mobile
- Social media links
- Contact information

## Customization Guide

### Colors
Main colors used in the design:
- Primary Blue: `#007AFF`
- Dark Background: `#1a1a1a`
- Light Background: `#f8f9fa`
- Text Dark: `#333333`
- Text Light: `#ffffff`

### Typography
The design uses system fonts with fallbacks:
```javascript
fontFamily: Platform.OS === 'web' ? 'Helvetica, Arial, sans-serif' : 'System'
```

### Responsive Breakpoints
- Uses `Dimensions` API for responsive sizing
- Platform-specific styles for web vs mobile
- Flexible layouts with percentages

## Adding Real Video Background

To add actual video playback (requires expo-av):

```bash
expo install expo-av
```

Then replace the VideoSection component with:

```javascript
import { Video } from 'expo-av';

// In VideoSection render:
<Video
  source={require('./assets/background-video.mp4')}
  rate={1.0}
  volume={0.0}
  isMuted={true}
  resizeMode="cover"
  shouldPlay
  isLooping
  style={styles.videoBackground}
/>
```

## Performance Optimization

- Images are loaded with `resizeMode="cover"` for optimal display
- ScrollView uses `showsVerticalScrollIndicator={false}` for cleaner UI
- Shadow effects use platform-specific properties

## Browser Compatibility

- Tested with React Native Web
- Compatible with modern browsers
- Graceful fallbacks for older browsers

## License

This landing page template is free to use for educational platforms.

## Support

For issues or questions about implementation, please ensure you're using:
- Expo SDK 32 or compatible version
- React Native Web properly configured
- All required assets in place