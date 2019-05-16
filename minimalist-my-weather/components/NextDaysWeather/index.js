import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import fecha from 'fecha';

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  cell: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: 15,
    paddingRight: 15,
  },
  image: {
    height: 64,
    width: 64,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    padding: 5,
  },
});

function NextDaysWeather({ weathers, onPress }) {
  if (!weathers || weathers.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {weathers.map(
          ({
            weather_state_abbr: weatherAbbr,
            min_temp: minTemp,
            max_temp: maxTemp,
            applicable_date: date,
            id,
          }) => (
            <TouchableOpacity
              style={styles.cell}
              key={id}
              onPress={() => onPress(id)}
            >
              <Text style={styles.text}>
                {fecha.format(new Date(date), 'ddd')}
              </Text>
              <Image
                style={styles.image}
                source={{
                  uri: `https://www.metaweather.com/static/img/weather/png/64/${weatherAbbr}.png`,
                }}
              />
              <Text style={styles.text}>
                {`${Math.round(minTemp)}°  ${Math.round(maxTemp)}°`}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );
}

export default NextDaysWeather;
