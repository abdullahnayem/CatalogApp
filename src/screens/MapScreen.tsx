import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Location } from '../types';

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);



const checkLocationPermission = async () => {
  try {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    
    const result = await check(permission);
    
    switch (result) {
      case RESULTS.GRANTED:
        setHasPermission(true);
        getCurrentLocation();
        break;
      case RESULTS.DENIED:
      case RESULTS.UNAVAILABLE:
        // Explicitly handle these cases
        await requestLocationPermission();
        break;
      case RESULTS.BLOCKED:
        setHasPermission(false);
        setLoading(false);
        showBlockedPermissionAlert();
        break;
      default:
        requestLocationPermission();
    }
  } catch (error) {
    console.error('Permission check error:', error);
    setLoading(false);
    Alert.alert(
      'Location Service Error',
      'An unexpected error occurred while checking location permissions.',
      [{ text: 'OK', onPress: () => requestLocationPermission() }]
    );
  }
};

const requestLocationPermission = async () => {
  try {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    
    const result = await request(permission);
    
    switch (result) {
      case RESULTS.GRANTED:
        setHasPermission(true);
        getCurrentLocation();
        break;
      case RESULTS.DENIED:
        setHasPermission(false);
        setLoading(false);
        showDeniedPermissionAlert();
        break;
      case RESULTS.BLOCKED:
        setHasPermission(false);
        setLoading(false);
        showBlockedPermissionAlert();
        break;
      default:
        setLoading(false);
    }
  } catch (error) {
    console.error('Permission request error:', error);
    setLoading(false);
    Alert.alert(
      'Permission Error',
      'Failed to request location permission. Please try again later.',
      [{ text: 'OK' }]
    );
  }
};

// Helper functions for consistent alerts
const showDeniedPermissionAlert = () => {
  Alert.alert(
    'Location Permission',
    'Location permission is required to show your current location on the map.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Try Again', onPress: requestLocationPermission },
    ]
  );
};

const showBlockedPermissionAlert = () => {
  Alert.alert(
    'Location Permission Blocked',
    'Location permission has been blocked. Please enable it in app settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ]
  );
};
const getCurrentLocation = () => {
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        setLoading(false);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Please make sure location services are enabled.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Retry', onPress: getCurrentLocation },
          ]
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };
  const handleRefreshLocation = () => {
    if (hasPermission) {
      getCurrentLocation();
    } else {
      requestLocationPermission();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="location-off" size={64} color="#ccc" />
        <Text style={styles.permissionTitle}>Location Permission Required</Text>
        <Text style={styles.permissionSubtitle}>
          Please grant location permission to see your current location on the map.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestLocationPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const defaultRegion = {
    latitude: location?.latitude || 37.78825,
    longitude: location?.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // If there's a map error, show a fallback UI
  if (mapError) {
    return (
      <View style={styles.permissionContainer}>
        <Icon name="map" size={64} color="#ccc" />
        <Text style={styles.permissionTitle}>Map Unavailable</Text>
        <Text style={styles.permissionSubtitle}>
          Unable to load the map. Please check your internet connection.
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => setMapError(false)}
        >
          <Text style={styles.permissionButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  try {
    return (
      <View style={styles.container}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={styles.map}
          region={defaultRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
        >
          {location && (
            <Marker
              coordinate={location}
              title="Your Location"
              description="You are here"
              pinColor="#007AFF"
            />
          )}
        </MapView>
        
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefreshLocation}
        >
          <Icon name="my-location" size={24} color="#007AFF" />
        </TouchableOpacity>
        
        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Lng: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>
    );
  } catch (error) {
    console.error('MapScreen render error:', error);
    setMapError(true);
    return (
      <View style={styles.permissionContainer}>
        <Icon name="error" size={64} color="#ccc" />
        <Text style={styles.permissionTitle}>Something went wrong</Text>
        <Text style={styles.permissionSubtitle}>
          Please try again or restart the app.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  locationInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
  },
});

export default MapScreen;
