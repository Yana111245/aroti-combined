# OAuth Setup Guide for Aroti

This guide covers setting up Apple Sign In and Google Sign In for the Aroti app using Supabase Auth.

## Prerequisites

- Supabase project with Auth enabled
- Apple Developer Account (for Apple Sign In)
- Google Cloud Console project (for Google Sign In)
- iOS app configured in Xcode

## 1. Supabase Configuration

### Enable OAuth Providers

1. Go to your Supabase Dashboard → Authentication → Providers
2. Enable Apple and Google providers
3. Configure redirect URLs:
   - **Development**: `http://localhost:5173/onboarding/finish`
   - **Production**: `https://yourdomain.com/onboarding/finish`
   - **iOS App**: `com.aroti.app://onboarding/finish`

### Environment Variables

Add to your `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## 2. Apple Sign In Setup

### Apple Developer Console

1. **Create App ID**:
   - Go to [Apple Developer Console](https://developer.apple.com/account/)
   - Certificates, Identifiers & Profiles → Identifiers
   - Create new App ID with "Sign In with Apple" capability
   - Bundle ID: `com.aroti.app`

2. **Create Service ID**:
   - Create new Service ID for web authentication
   - Identifier: `com.aroti.app.web`
   - Configure domains and redirect URLs:
     - Primary App ID: `com.aroti.app`
     - Domains: `yourdomain.com`, `localhost` (for development)
     - Redirect URLs: 
       - `https://yourdomain.com/onboarding/finish`
       - `http://localhost:5173/onboarding/finish`

3. **Create Private Key**:
   - Keys → Create new key
   - Enable "Sign In with Apple"
   - Download the `.p8` file
   - Note the Key ID and Team ID

### Supabase Apple Configuration

In Supabase Dashboard → Authentication → Providers → Apple:

- **Client ID**: Your Service ID (`com.aroti.app.web`)
- **Client Secret**: Generate using your private key, Key ID, and Team ID
- **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

## 3. Google Sign In Setup

### Google Cloud Console

1. **Create OAuth 2.0 Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`

2. **Enable Google+ API**:
   - APIs & Services → Library
   - Search for "Google+ API" and enable it

### Supabase Google Configuration

In Supabase Dashboard → Authentication → Providers → Google:

- **Client ID**: From Google Cloud Console
- **Client Secret**: From Google Cloud Console
- **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

## 4. iOS App Configuration

### Xcode Setup

1. **Enable Sign In with Apple**:
   - Open your iOS project in Xcode
   - Select your app target
   - Signing & Capabilities → Add Capability → Sign In with Apple

2. **Configure URL Schemes**:
   - Info.plist → URL Types
   - Add URL scheme: `com.aroti.app`
   - This matches the redirect URL in your Supabase configuration

3. **Update Info.plist**:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleURLName</key>
       <string>com.aroti.app</string>
       <key>CFBundleURLSchemes</key>
       <array>
         <string>com.aroti.app</string>
       </array>
     </dict>
   </array>
   ```

### Capacitor Configuration

The `capacitor.config.ts` is already configured with:
- iOS scheme: `Aroti`
- Android mixed content allowed for OAuth redirects

## 5. Testing

### Development Testing

1. **Web Development**:
   ```bash
   npm run dev
   ```
   - Navigate to `/onboarding/create-account`
   - Test both Apple and Google sign-in buttons
   - Verify redirect to `/onboarding/finish`

2. **iOS Testing**:
   ```bash
   npm run cap:copy
   npm run cap:open:ios
   ```
   - Build and run on iOS simulator or device
   - Test OAuth flows in native app context

### Production Testing

1. Deploy your app to production
2. Update Supabase redirect URLs to production domain
3. Test OAuth flows on production environment
4. Verify deep linking works on iOS devices

## 6. Troubleshooting

### Common Issues

1. **"Invalid redirect URL"**:
   - Ensure redirect URLs match exactly in all configurations
   - Check for trailing slashes or protocol mismatches

2. **Apple Sign In not working on iOS**:
   - Verify Sign In with Apple capability is enabled
   - Check that Bundle ID matches across all configurations
   - Ensure private key is correctly configured in Supabase

3. **Google Sign In not working**:
   - Verify OAuth consent screen is configured
   - Check that Google+ API is enabled
   - Ensure client ID and secret are correct

4. **Deep linking not working**:
   - Verify URL scheme is configured in Info.plist
   - Check that Capacitor is properly synced
   - Test with `npx cap sync` and rebuild

### Debug Steps

1. Check browser console for OAuth errors
2. Verify Supabase logs in Dashboard → Logs
3. Test redirect URLs manually
4. Check iOS device logs for deep link issues

## 7. Security Considerations

- Keep OAuth secrets secure and never commit them to version control
- Use environment variables for all sensitive configuration
- Regularly rotate OAuth credentials
- Monitor OAuth usage in Supabase Dashboard
- Implement proper error handling for OAuth failures

## 8. Next Steps

After OAuth is working:

1. Handle user profile completion for users who sign in without providing a name
2. Implement proper error handling and user feedback
3. Add analytics tracking for OAuth conversion rates
4. Consider implementing OAuth for other providers (Facebook, Twitter, etc.)
