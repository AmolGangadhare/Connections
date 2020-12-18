/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Loader from '../utils/Loader';
import {CheckInternetStatus} from '../utils/AppUtils';
import {GET_CONNECTION_LIST_API} from '../constants/AppConstants';
import {
  PushDataToDB,
  GetDataFromDB,
  checkIfDataPresent,
} from '../db_handler/DBHandler';
import ConnectionList from '../components/ConnectionList';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

var isAscending = true;
var connectionListBackup = [];
/**
 * Here in ConnectionListScreen, is a first screen shows connection list.
 * The list can be sorted by ascending and descendin order.
 * On click, profile details page will be shown up.
 */
export default class ConnectionListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaderVisible: false,
      connectionList: [],
    };
    this.getDataFromServer();
  }
  /**
   * This method firstly check if the data has been already downloaded or not.
   * If data downloaded it will fetch data from database.
   * If data is not already downloaded it will make an api call and
   * fetches the data from api and stores it in database for future use.
   */
  async getDataFromServer() {
    let isDataAlreadyPresent = await checkIfDataPresent();

    if (isDataAlreadyPresent) {
      this.getAndShowDataFromDB();
    } else {
      let isConnectedToInternet = await CheckInternetStatus();
      if (isConnectedToInternet) {
        this.setState({
          isLoaderVisible: true,
        });
        fetch(GET_CONNECTION_LIST_API)
          .then((response) => response.json())
          .then(async (json) => {
            let isDataAddedSuccessfully = await PushDataToDB(json);
            if (isDataAddedSuccessfully) {
              this.getAndShowDataFromDB();
              return json;
            }
          })
          .catch((error) => {
            this.setState({
              isLoaderVisible: false,
            });
            console.error(error);
          });
      } else {
        Alert.alert(
          'Action Required',
          'Internet access is required to proceed, please check internet settings',
        );
      }
    }
  }

  /**
   * This method handles database operation,
   * which fetched data from database and store it in state.
   */
  async getAndShowDataFromDB() {
    let connectionListTemp = await GetDataFromDB();
    connectionListBackup = connectionListTemp;
    this.setState({
      connectionList: connectionListTemp,
      isLoaderVisible: false,
    });
  }

  /**
   * This method handles sorting of list by first name
   * either in ascending or descending order.
   */
  sortListBasedOnAscOrDesc() {
    return this.state.connectionList.sort((a, b) => {
      if (isAscending) {
        if (a.firstname > b.firstname) {
          return -1;
        }
        if (a.firstname < b.firstname) {
          return 1;
        }
        return 0;
      } else {
        if (a.firstname < b.firstname) {
          return -1;
        }
        if (a.firstname > b.firstname) {
          return 1;
        }
        return 0;
      }
    });
  }

  /**
   * This method handles and filters the connection list
   * @param {user input text} input
   */
  handleOnTextChangeFilter(input) {
    var sorted = connectionListBackup.filter(function (connectionProfile) {
      return connectionProfile.firstname.includes(input);
    });

    this.setState({connectionList: sorted});
  }

  /**
   * This method handles connection card click and
   *  opens connection details screen
   */
  goToConnectionProfile(index) {
    this.props.navigation.navigate('ConnectionProfile', {
      connectionProfile: this.state.connectionList[index],
    });
  }

  render() {
    return (
      <SafeAreaView style={{height: Dimensions.get('window').height, flex: 1}}>
        {this.state.isLoaderVisible ? (
          <Loader message="Fetching data from server" />
        ) : null}

        <View style={ConnectionListStyle.searchBarView}>
          <View style={{flex: 1, marginStart: 20}}>
            <Icon name="ios-search" size={40} color="#D3D3D3" />
          </View>
          <View style={{flex: 8, justifyContent: 'center'}}>
            <TextInput
              placeholder="Search"
              onChangeText={(text) => this.handleOnTextChangeFilter(text)}
              placeholderTextColor="black"
              style={{
                fontSize: 18,
                width: Dimensions.get('window').width,
                alignSelf: 'flex-start',
              }}
            />
          </View>
          <View style={{flex: 1, marginEnd: 20, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={async () => {
                isAscending = !isAscending;
                var sortedList = this.sortListBasedOnAscOrDesc();
                this.setState({
                  connectionList: sortedList,
                });
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="filter" />
            </TouchableOpacity>
          </View>
        </View>

        <ConnectionList
          connectionListProp={this.state.connectionList}
          handleConnectionCardClick={this.goToConnectionProfile}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

const ConnectionListStyle = StyleSheet.create({
  searchBarView: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: '#D7D7D7',
    marginTop: 2,
    alignItems: 'center',
    height: 55,
  },
});
