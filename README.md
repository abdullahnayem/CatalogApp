# CatalogApp - React Native Ecommerce App

A React Native catalog application that displays products from the DummyJSON API with authentication, favorites management, and map functionality.

## Features

### Phase 1 ✅
- **Authentication Flow**: Login screen with persistent authentication
- **Home Screen**: Product listing with search functionality
- **Favorites Management**: Toggle favorites with instant updates across screens
- **Bottom Tab Navigation**: Home, Favorites, and Map screens
- **Map Integration**: Display current location on map

### Phase 2 ✅
- **Product Details Screen**: Detailed product information
- **Timestamp Display**: Native module integration (every 20 seconds)
- **Responsive Design**: Portrait and landscape mode support
- **TypeScript**: Full TypeScript implementation with strict type checking
- **State Management**: Redux Toolkit with RTK Query for API calls

## Technology Stack

- **React Native CLI** (v0.80.1)
- **TypeScript** - Strict type checking
- **Redux Toolkit** - State management
- **RTK Query** - API calls and caching
- **React Navigation** - Navigation management
- **React Native Maps** - Map functionality
- **React Native Vector Icons** - Icon library
- **AsyncStorage** - Local data persistence

## Prerequisites

Before running this project, ensure you have:

1. **Node.js** (v16 or higher)
2. **React Native CLI** installed globally
3. **Xcode** (for iOS development)
4. **Android Studio** (for Android development)
5. **CocoaPods** (for iOS dependencies)

Follow the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CatalogApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **iOS Setup**:
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. **Android Setup**:
   - Open Android Studio
   - Open the `android` folder
   - Sync project with Gradle files

## Running the Application

### Start Metro Bundler

```bash
npm start
```

### Run on iOS

```bash
npx react-native run-ios
```

Or open `ios/CatalogApp.xcworkspace` in Xcode and run.

### Run on Android

```bash
npx react-native run-android
```

## Demo Credentials

Use these credentials to test the login functionality:

- **Username**: `emilys`
- **Password**: `emilyspass`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx
│   └── TimestampDisplay.tsx
├── screens/            # Screen components
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── MapScreen.tsx
│   └── ProductDetailsScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── store/             # Redux store and slices
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       └── favoritesSlice.ts
├── services/          # API services
│   └── api.ts
├── types/            # TypeScript type definitions
│   └── index.ts
└── utils/            # Utility functions
    └── index.ts
```

## Key Features Implementation

### Authentication
- Persistent login using AsyncStorage
- JWT token management
- Automatic logout on token expiry

### Product Catalog
- Product listing with search
- Category filtering
- Favorites management
- Product details view

### State Management
- Redux Toolkit for global state
- RTK Query for API caching
- AsyncStorage for persistence

### Navigation
- Stack navigation for screens
- Bottom tabs for main sections
- Deep linking support

## API Integration

The app uses the [DummyJSON API](https://dummyjson.com) for:

- **Authentication**: `/auth/login`
- **Products**: `/products`, `/products/search`, `/products/{id}`
- **Categories**: `/products/categories`

## Development Guidelines

### Code Style
- TypeScript with strict type checking
- Functional components with hooks
- Redux Toolkit patterns
- Consistent naming conventions

### Testing
Run tests with:
```bash
npm test
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### iOS Issues
- Clean build folder: Product → Clean Build Folder in Xcode
- Reset Metro cache: `npx react-native start --reset-cache`
- Reinstall pods: `cd ios && pod install`

### Android Issues
- Clean project: `cd android && ./gradlew clean`
- Reset Metro cache: `npx react-native start --reset-cache`

### Common Issues
- **Metro bundler issues**: Clear cache and restart
- **Build failures**: Check React Native environment setup
- **Map not showing**: Ensure location permissions are granted

## Future Enhancements

- [ ] Push notifications
- [ ] Offline mode support
- [ ] Shopping cart functionality
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Social sharing
- [ ] Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Completed Phases

### Phase 1 ✅
- Login screen with authentication
- Home screen with product listing
- Bottom tab navigation
- Favorites functionality
- Map screen with current location

### Phase 2 ✅
- Product details screen
- Timestamp display with native module integration
- Complete TypeScript implementation
- Redux Toolkit state management
- RTK Query API integration

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
