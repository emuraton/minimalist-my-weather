import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { ApolloConsumer } from 'react-apollo';

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    height: 10,
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 20,
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#5c5c74',
  },
});

function CityRow({ locations, handlePress }) {
  if (!locations) return null;

  return (
    <ApolloConsumer>
      {client => (
        <FlatList
          style={styles.container}
          data={locations}
          renderItem={({ item }) => {
            return (
              <>
                <Text
                  style={styles.row}
                  onPress={() =>
                    handlePress({ client, woeid: item.woeid, city: item.title })
                  }
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
    </ApolloConsumer>
  );
}

export default CityRow;
