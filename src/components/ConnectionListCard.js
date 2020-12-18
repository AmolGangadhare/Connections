import React, {Component} from 'react';
import {CardItem} from 'native-base';
import {Text, Image, StyleSheet, Dimensions, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 * Card component
 */
export default class ConnectionListCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ConnectionProfile', {
            connectionProfile: this.props.connectionDetails,
          })
        }>
        <CardItem
          style={CardStyle.cardView}
          bordered={true}
          id={this.props.connectionDetails.index.toString()}>
          <View style={CardStyle.cardView}>
            <Image
              source={{uri: this.props.connectionDetails.picture}}
              style={CardStyle.image}
            />
            <View style={CardStyle.cardViewText}>
              <Text style={CardStyle.cardNameText}>
                {this.props.connectionDetails.firstname +
                  ' ' +
                  this.props.connectionDetails.surname}
              </Text>
              <Text>{this.props.connectionDetails.company}</Text>
            </View>
          </View>
        </CardItem>
      </TouchableOpacity>
    );
  }
}

const CardStyle = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 95,
    width: Dimensions.get('window').width - 10,
    alignSelf: 'center',
    paddingBottom: 2,
  },
  cardViewText: {
    flexDirection: 'column',
    marginStart: 15,
    marginLeft: 15,
  },
  cardNameText: {
    fontSize: 16,
  },
});
