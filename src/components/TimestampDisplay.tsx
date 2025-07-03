import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimestampDisplayProps } from '../types';

const TimestampDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(formattedTime);
    };

    // Update immediately
    updateTimestamp();

    // Set up interval to update every 20 seconds
    const interval = setInterval(updateTimestamp, 20000);

    return () => clearInterval(interval);
  }, []);

  if (!currentTime) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timestampText}>{currentTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 1000,
  },
  timestampText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
});

export default TimestampDisplay;
