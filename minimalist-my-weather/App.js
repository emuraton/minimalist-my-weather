import React from 'react';
import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import SearchInput from './components/Search';

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
    console.log({ locations });
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <SearchInput
            placeholder="Select a City"
            onSubmit={this.handleSubmit}
          />
          {locations && (
            <FlatList
              data={locations}
              renderItem={({ item }) => {
                return (
                  <>
                    <Text
                      style={styles.row}
                      onPress={() => console.log(item.woeid)}
                    >
                      {item.title}
                    </Text>
                    <View style={styles.line} />
                  </>
                );
              }}
              keyExtractor={item => item.woeid}
            />
          )}
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
  row: {
    width: 300,
    height: 10,
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 20,
    fontSize: 16,
    color: '#5c5c74',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#5c5c74',
    margin: 10,
  },
});
