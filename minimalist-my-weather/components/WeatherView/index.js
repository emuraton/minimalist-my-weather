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

export default function WeatherView() {
  const weathers = [
    {
      id: 4673120805847040,
      weather_state_name: 'Light Cloud',
      weather_state_abbr: 'lc',
      wind_direction_compass: 'SW',
      created: '2019-04-25T15:06:17.064868Z',
      applicable_date: '2019-04-25',
      min_temp: 11.73,
      max_temp: 14.56,
      the_temp: 15.22,
      wind_speed: 4.762288250462632,
      wind_direction: 234.9872083642845,
      air_pressure: 1013.9200000000001,
      humidity: 76,
      visibility: 11.534202755905511,
      predictability: 70,
    },
  ];
  if (!weathers) return null;
  const {
    weather_state_abbr: weatherAbbr,
    the_temp: temperature,
  } = weathers[0];

  console.log({ temperature });
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${BASE_URL}/static/img/weather/png/${weatherAbbr}.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.temperature}>15.22</Text>
    </View>
  );
}
