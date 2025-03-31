import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const WeatherComponent = ({ weatherData, city, onCityChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in {city}</Text>
      <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
      <Text style={styles.text}>Condition: {weatherData.weather[0].description}</Text>
      <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>

      {/* Input to change city */}
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={onCityChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 20,
    padding: 8,
  },
});

export default WeatherComponent;
