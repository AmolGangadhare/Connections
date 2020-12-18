import React, {Component} from 'react';
import {List} from 'native-base';
import ConnectionListCard from './ConnectionListCard';
import {SafeAreaView} from 'react-native';
/**
 * List component decoupled to reduce code in a single class.
 */
export default class ConnectionList extends Component {
  render() {
    return (
      <List
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        dataArray={this.props.connectionListProp}
        renderRow={(connection) => (
          <ConnectionListCard
            navigation={this.props.navigation}
            connectionDetails={connection}
            handleConnectionCardClick={this.props.handleConnectionCardClick}
          />
        )}
      />
    );
  }
}
