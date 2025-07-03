# Copilot Instructions for CatalogApp

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React Native CLI catalog app with TypeScript that displays products from the DummyJSON API. The app includes authentication, product listing, favorites management, and map functionality.

## Technical Stack
- React Native CLI with TypeScript
- Redux Toolkit for state management
- RTK Query for API calls and caching
- React Navigation for navigation
- Native modules for timestamp functionality

## Code Guidelines
- Use TypeScript with strict type checking
- Follow React Native best practices
- Use Redux Toolkit patterns for state management
- Implement proper error handling and loading states
- Use functional components with hooks
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Add proper TypeScript interfaces for all data structures
- Use RTK Query for all API calls with proper error handling

## Project Structure
- `/src/components` - Reusable UI components
- `/src/screens` - Screen components
- `/src/navigation` - Navigation configuration
- `/src/store` - Redux store configuration and slices
- `/src/services` - API services using RTK Query
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions
- `/src/hooks` - Custom React hooks

## Key Features
1. Authentication flow with persistent login
2. Product catalog with search and filtering
3. Favorites management with instant updates across screens
4. Map integration with current location
5. Native module for timestamp updates every 20 seconds
6. Responsive design for portrait and landscape modes
