# Starting the Educational Platform Landing Page

## Current Status
The project is being set up with npm install running...

## Steps to Run the Project:

1. **Install Dependencies** (currently running):
   ```bash
   npm install
   ```

2. **Start the Expo Development Server**:
   ```bash
   npm start
   # or
   expo start
   ```

3. **View the Landing Page**:
   - **Web**: Press `w` in the terminal or open http://localhost:19006
   - **Mobile**: Scan QR code with Expo Go app
   - **Android**: Press `a` (requires emulator)
   - **iOS**: Press `i` (requires simulator on Mac)

## Troubleshooting:

### Missing Images Warning
The app will show warnings about missing image assets. This is expected. To fix:
1. Open `assets/placeholder-generator.html` in a browser
2. Save each canvas as the corresponding image file
3. Or add your own images to the assets folder

### Expo SDK Version
This project uses Expo SDK 32. If you have issues:
```bash
npm install -g expo-cli@2.21.2
```

### Web View Issues
If the web view doesn't work properly, ensure you have:
- React Native Web installed (included in package.json)
- A modern browser (Chrome, Firefox, Safari)

## Quick Commands:
- `npm start` - Start development server
- `npm run web` - Start web-only
- `npm run android` - Start Android
- `npm run ios` - Start iOS

The landing page should display with all sections once the server starts!