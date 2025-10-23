# Capacitor iOS Setup Guide

## Prerequisites
- Node.js installed
- Xcode installed (from Mac App Store)
- iOS Simulator or physical iOS device

## Step-by-Step Terminal Commands

Run these commands in your project root directory (`/Users/yanakuchma/aroti-lovable/aroti-combined`):

### 1. Install Capacitor Dependencies
```bash
npm i -D @capacitor/cli
npm i @capacitor/core
```

### 2. Initialize Capacitor Project
```bash
npx cap init "Aroti" com.aroti.app
```

### 3. Build Your Web App
```bash
npm run build
```

### 4. Add iOS Platform
```bash
npx cap add ios
```

### 5. Copy Web Assets to Native Project
```bash
npx cap copy
```

### 6. Open in Xcode
```bash
npx cap open ios
```

## Alternative: Using npm scripts (after setup)

Once you've run the initial setup, you can use these convenient npm scripts:

```bash
# Build and sync changes
npm run build
npm run cap:sync

# Open in Xcode
npm run cap:open:ios
```

## What Each Command Does

- **`npm i -D @capacitor/cli`**: Installs Capacitor CLI as a development dependency
- **`npm i @capacitor/core`**: Installs Capacitor core library
- **`npx cap init`**: Creates the Capacitor configuration and initializes the project
- **`npm run build`**: Builds your React app into the `dist/` folder
- **`npx cap add ios`**: Creates the iOS native project structure
- **`npx cap copy`**: Copies your built web app into the native iOS project
- **`npx cap open ios`**: Opens the iOS project in Xcode

## Troubleshooting

If you encounter issues:

1. **Build fails**: Make sure all dependencies are installed with `npm install`
2. **Xcode won't open**: Ensure Xcode is installed and you're on macOS
3. **Assets not loading**: Run `npm run build` again, then `npx cap copy`
4. **Permission errors**: Make sure you have write permissions in the project directory

## Next Steps

After running these commands, follow the "Xcode Setup Guide" to run your app on iOS simulator or device.
