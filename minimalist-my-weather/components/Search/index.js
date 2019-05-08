import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { ApolloConsumer } from 'react-apollo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  textInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#f5f5f5',
    color: '#5a6672',
    borderRadius: 50,
    paddingLeft: 30,
    fontSize: 16,
    fontWeight: '500',
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
          <View style={styles.container}>
            <TextInput
              value={this.props.value || this.state.text}
              autoCorrect={false}
              placeholder={this.props.placeholder}
              underlineColorAndroid="transparent"
              style={styles.textInput}
              clearButtonMode="always"
              onChangeText={this.handleChangeText}
              onSubmitEditing={() => this.handleSubmitEditing(client)}
              placeholderTextColor={styles.textInput.color}
            />
          </View>
        )}
      </ApolloConsumer>
    );
  }
}
