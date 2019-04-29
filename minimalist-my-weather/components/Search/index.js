import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { ApolloConsumer } from 'react-apollo';

const styles = StyleSheet.create({
  searchBar: {
    paddingTop: 50,
  },
  textInput: {
    width: 300,
    height: 50,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: '#63717f',
  },
});

export default class SeachInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = client => {
    if (!this.state.text) return;

    this.props.onSubmit(client, this.state.text);
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <View style={styles.searchBar}>
            <TextInput
              value={this.state.text}
              autoCorrect={false}
              placeholder={this.props.placeholder}
              underlineColorAndroid="transparent"
              style={styles.textInput}
              clearButtonMode="always"
              onChangeText={this.handleChangeText}
              onSubmitEditing={() => this.handleSubmitEditing(client)}
            />
          </View>
        )}
      </ApolloConsumer>
    );
  }
}
