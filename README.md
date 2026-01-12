# BePro Academy - Financial Education Platform

A modern, responsive landing page for BePro Academy, featuring advanced financial education courses, expert instructors, and comprehensive market analysis training.

## 🚀 Features

- **Video Background Hero Section** with login/registration forms
- **Animated Text Statements** with particle effects
- **Interactive Platform Features** showcase
- **Statistics Section** with animated counters
- **Contact Form** with validation
- **Team Member Popups** for instructors
- **AI-Powered Chatbot** for instant support
- **Fully Responsive Design** optimized for all devices

## 💻 Technology Stack

- **React Native** (Expo SDK 32)
- **HTML/CSS/JavaScript** (for web deployment)
- **Linear Gradients** and animations
- **Video Background** support

## 📦 Project Structure

```
bepro-academy/
├── components/           # React Native components
│   ├── HeroSection.js   # Video background with forms
│   ├── AnimatedStatements.js
│   ├── PlatformFeatures.js
│   ├── StatsSection.js
│   ├── ContactForm.js
│   ├── Footer.js
│   └── TeamAndChat.js   # Team icons and chatbot
├── assets/              # Images and videos
├── App.js               # Main React Native app
├── bepro-academy-complete.html  # Static HTML version
├── build-for-netlify.js # Build script for deployment
├── netlify.toml         # Netlify configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Deployment to Netlify

### Quick Deploy

1. **Fork or Clone this repository**
   ```bash
   git clone git@github.com:deltadev462-star/bepro-academy.git
   cd bepro-academy
   ```

2. **Install dependencies** (if running locally)
   ```bash
   npm install
   ```

3. **Build for Netlify**
   ```bash
   npm run build-web
   ```
   This creates a `web-build/` directory with the static files.

### Deploy with Netlify

#### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect to GitHub and select your repository
5. **Build settings are automatically configured** via `netlify.toml`:
   - Build command: `npm run build-web`
   - Publish directory: `web-build`
6. Click "Deploy site"

#### Option 2: Manual Deploy

1. Run `npm run build-web` locally
2. Drag the `web-build` folder to Netlify's deployment area
3. Your site will be live instantly

### Environment Setup

No environment variables required! The site uses:
- Embedded styles and scripts
- Local assets (videos/images)
- No external API dependencies

## 🛠️ Local Development

### React Native App (Expo)
```bash
npm start
# Then press 'w' to open in web browser
```

### HTML Version (for quick preview)
```bash
node serve-local.js
# Open http://localhost:8080
```

## 📱 Features Detail

### Team Members
- **Mohammed**: Senior Academic Lecturer & Financial Expert
  - WhatsApp: +201035801035
  - Expertise in financial data analysis
  
- **Abdullah**: CEO & Platform Administrator
  - Direct: +966538751281
  - Platform vision and leadership

### Chatbot Assistant
- Instant responses to common questions
- Course information and pricing
- Registration guidance
- 24/7 availability

## 🎨 Design Features

- Dark theme with gradient accents
- Glassmorphism effects
- Smooth animations and transitions
- Video background with overlay
- Responsive grid layouts
- Interactive hover effects

## 📄 License

© 2024 BePro-Academy. All rights reserved.

## 🤝 Contact

- Email: info@bepro-academy.com
- WhatsApp: +201035801035 (Mohammed)
- Direct: +966538751281 (Abdullah)

---

**Trading Disclaimer**: Trading involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results. Educational content is for informational purposes only.