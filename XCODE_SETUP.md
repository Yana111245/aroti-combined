# Xcode Setup Guide for Beginners

## What to Click in Xcode

After running `npx cap open ios`, Xcode will open with your Aroti project. Here's exactly what to do:

### 1. Select Your Target Device/Simulator
- **Look for**: A dropdown menu at the top of Xcode (next to the play button)
- **Click**: The dropdown that shows "Aroti > iPhone 15 Pro" (or similar)
- **Choose**: 
  - **iPhone 15 Pro** (recommended for testing)
  - **iPhone 14** (if you want older device testing)
  - **Your physical device** (if connected via USB)

### 2. Run the App
- **Look for**: The triangular "Play" button (▶️) in the top-left corner
- **Click**: The Play button
- **Wait**: Xcode will build and launch your app (this may take 1-2 minutes the first time)

### 3. What You Should See
- iOS Simulator will open (if you selected a simulator)
- Your Aroti app will launch with your existing React UI
- The app should look and work exactly like your web version

## Common Issues & Solutions

### Issue: "Build Failed" Error
**Solution**: 
1. Click the "Clean Build Folder" option in Xcode menu (Product → Clean Build Folder)
2. Try running again with the Play button

### Issue: Simulator Won't Open
**Solution**:
1. Go to Xcode → Preferences → Components
2. Download the iOS Simulator if it's not installed
3. Try selecting a different simulator from the dropdown

### Issue: App Crashes on Launch
**Solution**:
1. Check the Xcode console (bottom panel) for error messages
2. Make sure you ran `npm run build` and `npx cap copy` before opening Xcode
3. Try cleaning and rebuilding

### Issue: Assets/Images Not Loading
**Solution**:
1. Close Xcode
2. Run these commands in terminal:
   ```bash
   npm run build
   npx cap copy
   ```
3. Reopen Xcode with `npx cap open ios`

## Development Workflow

### Making Changes to Your App
1. **Edit your React code** in your normal editor (VS Code, etc.)
2. **Build the changes**:
   ```bash
   npm run build
   npx cap copy
   ```
3. **In Xcode**: Click the Play button again to see changes

### Quick Refresh (Alternative)
Instead of reopening Xcode each time, you can:
1. Make your changes
2. Run `npm run build && npx cap copy`
3. In Xcode, press **Cmd+R** to refresh the app

## Testing on Physical Device

### To test on your iPhone:
1. **Connect your iPhone** to your Mac via USB
2. **Trust the computer** when prompted on your iPhone
3. **In Xcode**: Select your iPhone from the device dropdown
4. **Click Play**: The app will install and run on your device

### Note about Developer Account
- For basic testing, you can use your Apple ID
- For App Store distribution, you'll need a paid Apple Developer account ($99/year)

## Success Indicators

✅ **You're successful when**:
- Xcode opens without errors
- You can select a simulator/device from the dropdown
- The Play button builds and runs the app
- Your Aroti app appears in the iOS Simulator
- All your existing UI components work as expected

## Next Steps

Once your app is running successfully:
- Test all your app's features in the simulator
- Consider testing on a physical device
- When ready, you can submit to the App Store (requires Apple Developer account)

## Need Help?

If you get stuck:
1. Check the Xcode console for specific error messages
2. Make sure all terminal commands completed successfully
3. Try the troubleshooting steps above
4. The Capacitor documentation is also helpful: https://capacitorjs.com/docs
