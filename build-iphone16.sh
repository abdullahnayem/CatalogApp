#!/bin/bash

# iPhone 16 specific build script with path space handling
echo "🚀 Building CatalogApp for iPhone 16..."

# Navigate to project directory with proper escaping
cd "/Users/abdullahmd.nayem/TechnoNext Assignment/CatalogApp"

# Set environment variables to handle spaces
export SRCROOT="$(pwd)"
export PROJECT_DIR="$(pwd)"

# Start Metro bundler if not running
if ! pgrep -f "react-native start" > /dev/null; then
    echo "📱 Starting Metro bundler..."
    npx react-native start --reset-cache &
    sleep 5
fi

# Clean build
echo "🧹 Cleaning build artifacts..."
rm -rf ios/build
rm -rf ~/Library/Developer/Xcode/DerivedData/CatalogApp-*

# Build for iPhone 16 with proper path handling
echo "🔨 Building for iPhone 16..."
npx react-native run-ios --simulator "iPhone 16" --verbose

echo "✅ Build complete for iPhone 16!"
