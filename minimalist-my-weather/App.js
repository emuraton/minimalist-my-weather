import React from 'react';
import { StyleSheet, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SearchInput from './components/Search';
import CityRow from './components/CityRow';
import { GET_LOCATIONS } from './utils/gql';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
    };
  }

  handleSubmit = async (client, query) => {
    const { data } = await client.query({
      query: GET_LOCATIONS,
      variables: {
        query,
      },
    });
    if (data) {
      this.setState(() => ({
        locations: data.getLocations,
      }));
    }
  };

  render() {
    const { locations } = this.state;
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <SearchInput
            placeholder="Select a City"
            onSubmit={this.handleSubmit}
          />
          {locations && <CityRow locations={locations} />}
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
