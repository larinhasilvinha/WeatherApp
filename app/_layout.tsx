import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text } from 'react-native';
import axios from 'axios';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isReady, setIsReady] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London'); // Default city

  // Fetch weather data
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsReady(true);
      fetchWeatherData(city);
    }
  }, [loaded]);

  const fetchWeatherData = async (city) => {
    try {
      const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (!isReady) {
    return null; // Wait for fonts and data
  }

  // Dynamic theme selection based on color scheme
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      {weatherData && (
        <WeatherComponent weatherData={weatherData} city={city} onCityChange={setCity} />
      )}

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const WeatherComponent = ({ weatherData, city, onCityChange }) => {
  return (
    <div style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Weather in {city}</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Temperature: {weatherData.main.temp}°C
      </Text>
      <Text style={{ fontSize: 18 }}>
        Condition: {weatherData.weather[0].description}
      </Text>
      <Text style={{ fontSize: 18 }}>Humidity: {weatherData.main.humidity}%</Text>

      {/* A simple input to change the city */}
      <TextInput
        style={{ borderColor: '#ccc', borderWidth: 1, marginTop: 20, padding: 8 }}
        placeholder="Enter city"
        value={city}
        onChangeText={onCityChange}
      />
    </div>
  );
};
