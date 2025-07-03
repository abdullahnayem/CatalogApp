#!/bin/bash

# CatalogApp Troubleshooting Script
echo "🔧 CatalogApp Troubleshooting & Fixes"
echo "======================================"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking Prerequisites..."
if command_exists node; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
fi

if command_exists npm; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found"
fi

if command_exists pod; then
    echo "✅ CocoaPods: $(pod --version)"
else
    echo "❌ CocoaPods not found"
fi

if command_exists xcodebuild; then
    echo "✅ Xcode: $(xcodebuild -version | head -1)"
else
    echo "❌ Xcode not found"
fi

echo ""

# Check if we're in the right directory
if [ -f "package.json" ] && [ -d "ios" ] && [ -d "android" ]; then
    echo "✅ In correct CatalogApp directory"
else
    echo "❌ Not in CatalogApp directory or project files missing"
    exit 1
fi

echo ""
echo "🛠️  Available Fix Options:"
echo "1. Clean and reset everything"
echo "2. Reinstall iOS dependencies"
echo "3. Kill Metro bundler and restart"
echo "4. Clean iOS build"
echo "5. Full project reset"
echo ""

read -p "Enter option number (1-5) or 'q' to quit: " choice

case $choice in
    1)
        echo "🧹 Cleaning and resetting..."
        npm cache clean --force
        rm -rf node_modules
        npm install
        cd ios && rm -rf build && pod install && cd ..
        echo "✅ Clean complete! Try running: npx react-native run-ios"
        ;;
    2)
        echo "📱 Reinstalling iOS dependencies..."
        cd ios
        rm -rf Pods Podfile.lock build
        pod install --repo-update
        cd ..
        echo "✅ iOS dependencies reinstalled!"
        ;;
    3)
        echo "🔄 Restarting Metro bundler..."
        lsof -ti:8081 | xargs kill -9 2>/dev/null
        echo "Metro bundler stopped. Start with: npx react-native start"
        ;;
    4)
        echo "🏗️  Cleaning iOS build..."
        cd ios
        rm -rf build
        xcodebuild clean -workspace CatalogApp.xcworkspace -scheme CatalogApp
        cd ..
        echo "✅ iOS build cleaned!"
        ;;
    5)
        echo "🔥 Full project reset..."
        lsof -ti:8081 | xargs kill -9 2>/dev/null
        npm cache clean --force
        rm -rf node_modules package-lock.json
        cd ios && rm -rf Pods Podfile.lock build && cd ..
        npm install
        cd ios && pod install && cd ..
        echo "✅ Full reset complete!"
        ;;
    q)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac

echo ""
echo "🚀 Quick Commands:"
echo "  Start Metro: npx react-native start"
echo "  Run iOS: npx react-native run-ios"
echo "  Run Android: npx react-native run-android"
echo ""
echo "🔐 Demo Login:"
echo "  Username: emilys"
echo "  Password: emilyspass"
