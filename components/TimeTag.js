import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class TimeTag extends React.Component {
  render() {
    return (
      <View style={[styles.timeButtonContainer, this.props.style]}>
        <Text>{this.props.children.format("h A")}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timeButtonContainer: {
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 20,
    borderRadius: 5,
  },
})
