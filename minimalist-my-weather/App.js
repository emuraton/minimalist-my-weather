import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SearchInput from './components/Search';
import CityRow from './components/CityRow';
import WeatherView from './components/WeatherView';
import NextDaysWeather from './components/NextDaysWeather';
import { GET_LOCATIONS, GET_LOCATION } from './utils/gql';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      weathers: [
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
        {
          id: 6487367470809088,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'WSW',
          created: '2019-04-25T15:06:20.059768Z',
          applicable_date: '2019-04-26',
          min_temp: 11.745000000000001,
          max_temp: 20.045,
          the_temp: 21.39,
          wind_speed: 4.290698108133832,
          wind_direction: 239.82798463916453,
          air_pressure: 1014.625,
          humidity: 65,
          visibility: 13.85160661735465,
          predictability: 70,
        },
        {
          id: 5714445961527296,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          wind_direction_compass: 'SW',
          created: '2019-04-25T15:06:23.272691Z',
          applicable_date: '2019-04-27',
          min_temp: 12.18,
          max_temp: 20.58,
          the_temp: 21.265,
          wind_speed: 4.474460324184098,
          wind_direction: 227.0023469842594,
          air_pressure: 1013.875,
          humidity: 64,
          visibility: 12.309984689413824,
          predictability: 71,
        },
        {
          id: 6156191132549120,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'SSW',
          created: '2019-04-25T15:06:26.455455Z',
          applicable_date: '2019-04-28',
          min_temp: 11.55,
          max_temp: 20.759999999999998,
          the_temp: 19.665,
          wind_speed: 5.900157922890322,
          wind_direction: 210.5621338363528,
          air_pressure: 1011.36,
          humidity: 65,
          visibility: 13.20320577825499,
          predictability: 70,
        },
        {
          id: 6159086678704128,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'SSW',
          created: '2019-04-25T15:06:29.089577Z',
          applicable_date: '2019-04-29',
          min_temp: 11.045,
          max_temp: 18.810000000000002,
          the_temp: 17.745,
          wind_speed: 5.687262867098809,
          wind_direction: 213.50295800170935,
          air_pressure: 1009.925,
          humidity: 66,
          visibility: 13.020211962141095,
          predictability: 70,
        },
        {
          id: 4679222343761920,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'SW',
          created: '2019-04-25T15:06:32.094357Z',
          applicable_date: '2019-04-30',
          min_temp: 11.44,
          max_temp: 17.035,
          the_temp: 17.65,
          wind_speed: 5.339391553328561,
          wind_direction: 224.0,
          air_pressure: 1010.43,
          humidity: 67,
          visibility: 9.997862483098704,
          predictability: 70,
        },
      ],
      isLoading: false,
      city: '',
    };
  }

  handleCityChoice = async ({ client, woeid, city }) => {
    const { data } = await client.query({
      query: GET_LOCATION,
      variables: {
        woeid,
      },
    });
    this.setState(() => ({
      weathers: data.getLocation.consolidated_weather,
      city,
    }));
  };

  handleSubmit = async (client, query) => {
    this.setState(() => ({
      isLoading: true,
      weathers: null,
    }));

    const { data } = await client.query({
      query: GET_LOCATIONS,
      variables: {
        query,
      },
    });
    this.setState(() => ({
      locations: data ? data.getLocations : null,
      isLoading: false,
    }));
  };

  render() {
    const { locations, weathers, isLoading, city } = this.state;
    return (
      <ApolloProvider client={client}>
        <>
          <View style={styles.inputContainer}>
            <SearchInput
              placeholder="Search"
              onSubmit={this.handleSubmit}
              value={city}
            />
          </View>
          <View style={styles.weatherContainer}>
            {isLoading && <Text>Loading...</Text>}
            {!weathers && (
              <CityRow
                locations={locations}
                handlePress={this.handleCityChoice}
              />
            )}
            <WeatherView weathers={weathers} />
          </View>
          <NextDaysWeather />
        </>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: '#1976d2',
  },
  weatherContainer: {
    flex: 4,
    backgroundColor: 'white',
  },
});
