import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SearchInput from './components/Search';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchInput placeholder="Select a City" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
