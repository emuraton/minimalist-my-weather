import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import fecha from 'fecha';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 150,
    width: 150,
  },
  temperature: {
    fontSize: 80,
    color: 'lightblue',
    paddingTop: 20,
    paddingLeft: 30,
  },
});

const BASE_URL = 'https://www.metaweather.com';

export default function WeatherView({ weather }) {
  if (!weather) return null;

  const {
    weather_state_abbr: weatherAbbr,
    the_temp: temperature,
    applicable_date: date,
  } = weather;

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>
        {fecha.format(new Date(date), 'ddd')}
      </Text>
      <Image
        source={{
          uri: `${BASE_URL}/static/img/weather/png/${weatherAbbr}.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.temperature}>{Math.round(temperature)}
°
</Text>
    </View>
  );
}
