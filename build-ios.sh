#!/bin/bash

# iOS Build Helper Script for CatalogApp
echo "🚀 Building iOS CatalogApp..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Check if Metro is running
if ! pgrep -f "react-native start" > /dev/null; then
    echo "📱 Starting Metro bundler..."
    npx react-native start &
    METRO_PID=$!
    echo "Metro started with PID: $METRO_PID"
    sleep 5
else
    echo "✅ Metro bundler is already running"
fi

# Clean and build iOS
echo "🧹 Cleaning iOS build artifacts..."
rm -rf ios/build
rm -rf ios/DerivedData

echo "🔨 Building iOS app..."
cd ios
xcodebuild -workspace "CatalogApp.xcworkspace" \
           -scheme "CatalogApp" \
           -configuration Debug \
           -destination 'platform=iOS Simulator,name=iPhone 16' \
           -derivedDataPath "./DerivedData" \
           clean build

if [ $? -eq 0 ]; then
    echo "✅ iOS build successful!"
    echo "📱 You can now run the app in Xcode or using:"
    echo "   npx react-native run-ios"
else
    echo "❌ iOS build failed. Check the errors above."
    echo "💡 Try opening CatalogApp.xcworkspace in Xcode and building from there."
fi

cd ..
echo "🎉 Build process complete!"
