import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SearchInput from './components/Search';
import CityRow from './components/CityRow';
import WeatherView from './components/WeatherView';
import { GET_LOCATIONS, GET_LOCATION } from './utils/gql';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      weathers: null,
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
    flex: 5,
    paddingTop: 50,
    backgroundColor: 'white',
  },
});
