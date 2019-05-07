import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    height: 200,
    width: 200,
  },
  temperature: {
    fontSize: 48,
    color: 'red',
    paddingTop: 20,
  },
});

const BASE_URL = 'https://www.metaweather.com';

export default function WeatherView({ weathers }) {
  if (!weathers) return null;
  const {
    weather_state_abbr: weatherAbbr,
    the_temp: temperature,
  } = weathers[0];

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${BASE_URL}/static/img/weather/png/${weatherAbbr}.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.temperature}>{temperature}</Text>
    </View>
  );
}
