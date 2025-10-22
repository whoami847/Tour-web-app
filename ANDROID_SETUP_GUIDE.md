# Android Apps Setup Guide - Tournament Platform

এই গাইড অনুসরণ করে আপনি **দুটি আলাদা Android app** তৈরি করতে পারবেন:

1. **User Panel App** - সাধারণ ইউজারদের জন্য
2. **Admin Panel App** - অ্যাডমিনদের জন্য

## Prerequisites

### 1. Android Studio ইনস্টল করুন
- [Android Studio](https://developer.android.com/studio) ডাউনলোড করে ইনস্টল করুন
- Android SDK Tools এবং Android SDK Platform-Tools ইনস্টল করুন

### 2. Java Development Kit (JDK)
- Java 17 অথবা Java 21 ইনস্টল করুন
- JAVA_HOME environment variable সেট করুন

### 3. Android SDK Environment
```bash
# Android SDK path আপনার system অনুযায়ী সেট করুন
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

## Step 1: User Panel App Setup

### 1.1 প্রথমে current webapp এর copy তৈরি করুন
```bash
# User Panel app এর জন্য আলাদা directory তৈরি করুন
mkdir esports-hq-user-app
cp -r ./* esports-hq-user-app/
cd esports-hq-user-app
```

### 1.2 User Panel এর জন্য Capacitor config
```bash
# capacitor.config.ts ফাইল এডিট করুন
```

**capacitor.config.ts** (User Panel):
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esportshq.user',
  appName: 'Esports HQ - User',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### 1.3 User Panel এর জন্য navigation customize করুন
**src/components/layout/sidebar.tsx** তে admin routes hide করুন:

```typescript
// User Panel এর জন্য শুধুমাত্র এই routes দেখান
const userRoutes = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tournaments', href: '/tournaments', icon: Trophy },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  { name: 'Leaderboard', href: '/leaderboard', icon: BarChart3 },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Settings', href: '/settings', icon: Settings },
];
```

### 1.4 User Panel build করুন
```bash
npm run build
npx cap add android
npx cap sync
```

## Step 2: Admin Panel App Setup

### 2.1 Admin Panel এর জন্য আলাদা directory তৈরি করুন
```bash
# Main directory থেকে
mkdir esports-hq-admin-app
cp -r ./* esports-hq-admin-app/
cd esports-hq-admin-app
```

### 2.2 Admin Panel এর জন্য Capacitor config
**capacitor.config.ts** (Admin Panel):
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.esportshq.admin',
  appName: 'Esports HQ - Admin',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### 2.3 Admin Panel এর জন্য navigation customize করুন
**src/components/layout/sidebar.tsx** তে admin routes কে highlight করুন:

```typescript
// Admin Panel এর জন্য admin routes কে top এ রাখুন
const adminRoutes = [
  { name: 'Admin Dashboard', href: '/admin', icon: Shield },
  { name: 'Tournaments', href: '/admin/tournaments', icon: Trophy },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Games', href: '/admin/games', icon: Gamepad2 },
  { name: 'Withdraw Requests', href: '/admin/withdraw-requests', icon: CreditCard },
  { name: 'Results Approval', href: '/admin/results-approval', icon: CheckCircle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];
```

### 2.4 Admin Panel build করুন
```bash
npm run build
npx cap add android
npx cap sync
```

## Step 3: App Icons এবং Branding

### 3.1 User Panel App Icons
**User Panel** এর জন্য আলাদা icons তৈরি করুন:
- `android/app/src/main/res/` এ বিভিন্ন size এর icon রাখুন
- Color scheme: Primary blue এবং green

### 3.2 Admin Panel App Icons
**Admin Panel** এর জন্য আলাদা icons তৈরি করুন:
- `android/app/src/main/res/` এ বিভিন্ন size এর icon রাখুন
- Color scheme: Primary red এবং orange (admin indication)

## Step 4: Android Project Configuration

### 4.1 User Panel Android Config
**android/app/src/main/AndroidManifest.xml**:
```xml
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">
    
    <activity
        android:name=".MainActivity"
        android:exported="true"
        android:label="@string/title_activity_main"
        android:theme="@style/AppTheme.NoActionBarLaunch">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
</application>
```

### 4.2 Admin Panel Android Config
**android/app/src/main/AndroidManifest.xml**:
```xml
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher_admin"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_admin_round"
    android:supportsRtl="true"
    android:theme="@style/AppTheme">
    
    <activity
        android:name=".MainActivity"
        android:exported="true"
        android:label="@string/title_activity_main"
        android:theme="@style/AppTheme.NoActionBarLaunch">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
</application>
```

## Step 5: Authentication এবং Role-based Access

### 5.1 User Panel Authentication
**src/context/auth-context.tsx** তে user role check করুন:
```typescript
// User Panel এ শুধু regular users দের access দিন
const allowedRoles = ['user', 'player'];

useEffect(() => {
  if (profile && !allowedRoles.includes(profile.role)) {
    toast({
      title: "Access Denied",
      description: "This app is for regular users only",
      variant: "destructive"
    });
    // Redirect to login or show error
  }
}, [profile]);
```

### 5.2 Admin Panel Authentication
**src/context/auth-context.tsx** তে admin role check করুন:
```typescript
// Admin Panel এ শুধু admins দের access দিন
const allowedRoles = ['admin', 'moderator'];

useEffect(() => {
  if (profile && !allowedRoles.includes(profile.role)) {
    toast({
      title: "Admin Access Required",
      description: "This app is for administrators only",
      variant: "destructive"
    });
    // Redirect to login or show error
  }
}, [profile]);
```

## Step 6: Build এবং Run

### 6.1 User Panel App Build
```bash
cd esports-hq-user-app
npm run build
npx cap sync
npx cap open android
```

### 6.2 Admin Panel App Build
```bash
cd esports-hq-admin-app
npm run build
npx cap sync
npx cap open android
```

## Step 7: Testing

### 7.1 User Panel Testing
- Tournament join functionality
- Profile management
- Wallet operations
- Leaderboard viewing
- Game browsing

### 7.2 Admin Panel Testing
- Tournament management
- User management
- Results approval
- Withdraw request handling
- Analytics dashboard

## Step 8: Deployment

### 8.1 Generate APK Files
```bash
# User Panel
cd esports-hq-user-app/android
./gradlew assembleDebug
# APK location: app/build/outputs/apk/debug/app-debug.apk

# Admin Panel
cd esports-hq-admin-app/android
./gradlew assembleDebug
# APK location: app/build/outputs/apk/debug/app-debug.apk
```

### 8.2 Google Play Store Upload
1. **User Panel App**: `com.esportshq.user`
2. **Admin Panel App**: `com.esportshq.admin`

## Key Features of Both Apps

### User Panel App Features:
- ✅ Tournament browsing এবং registration
- ✅ Profile management
- ✅ Wallet operations
- ✅ Match results viewing
- ✅ Leaderboard
- ✅ Game information
- ✅ Push notifications

### Admin Panel App Features:
- ✅ Tournament creation এবং management
- ✅ User management
- ✅ Results approval
- ✅ Withdraw request handling
- ✅ Analytics dashboard
- ✅ Game management
- ✅ Banner management
- ✅ Settings management

## Real-time Sync

উভয় app একই Firebase database ব্যবহার করে, তাই:
- Admin panel এ যে changes করা হবে সেগুলো instantly user panel এ reflect হবে
- Tournament updates, results, leaderboard সব real-time update হবে
- User এবং admin activities সব synced থাকবে

## Troubleshooting

### Common Issues:
1. **Build Errors**: Clear cache এবং rebuild করুন
2. **Permission Issues**: Android manifest এ permissions check করুন
3. **Firebase Connection**: google-services.json file correctly placed করুন
4. **Icons Not Showing**: Icon paths এবং sizes verify করুন

## Next Steps

এই guide অনুসরণ করে আপনি দুটি professional Android apps তৈরি করতে পারবেন। প্রতিটি app এর আলাদা functionality এবং target audience থাকবে, কিন্তু backend data সব shared থাকবে।

**Questions?** যদি কোন step এ সমস্যা হয় বা additional customization প্রয়োজন হয়, আমি help করতে পারি।