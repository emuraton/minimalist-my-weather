import React from 'react';
import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SearchInput from './components/Search';
import CityRow from './components/CityRow';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const GET_LOCATIONS = gql`
  query Location($query: String!) {
    getLocations(query: $query) {
      title
      woeid
    }
  }
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // locations: [
      //   { title: 'London', woeid: '44418', __typename: 'Location' },
      //   { title: 'London', woeid: '44419', __typename: 'Location' },
      // ],
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
      console.log({ data });
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
