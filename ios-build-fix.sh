#!/bin/bash

# iOS Build Fix Script for paths with spaces
# This script properly handles the space in the project path

set -e

echo "🔧 Fixing iOS build issues for paths with spaces..."

# Set proper environment variables
export PROJECT_PATH="/Users/abdullahmd.nayem/TechnoNext Assignment/CatalogApp"
export IOS_PATH="${PROJECT_PATH}/ios"
export WORKSPACE_PATH="${IOS_PATH}/CatalogApp.xcworkspace"

echo "📁 Project Path: $PROJECT_PATH"
echo "📱 iOS Path: $IOS_PATH"
echo "⚡ Workspace: $WORKSPACE_PATH"

# Navigate to project directory
cd "$PROJECT_PATH"

echo "🧹 Cleaning previous builds..."
cd ios
rm -rf build
rm -rf DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/CatalogApp-*

echo "🔨 Building for iPhone 16..."
xcodebuild \
  -workspace "CatalogApp.xcworkspace" \
  -scheme "CatalogApp" \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -derivedDataPath "./DerivedData" \
  build

echo "🚀 Build completed successfully!"
echo "📱 Now starting iPhone 16 simulator..."

# Start the simulator
xcrun simctl boot "iPhone 16" 2>/dev/null || echo "iPhone 16 simulator already running"

echo "📦 Installing app on iPhone 16..."
xcodebuild \
  -workspace "CatalogApp.xcworkspace" \
  -scheme "CatalogApp" \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -derivedDataPath "./DerivedData" \
  test-without-building

echo "✅ App should now be running on iPhone 16!"
