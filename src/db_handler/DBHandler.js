import {UpdateMode} from 'realm';
import {ConnectionModel} from '../constants/ConnectionModel';

const Realm = require('realm');
const CONNECTION_LIST_SCHEMA = 'Connection_List';


/**
 * This file contains database operations made in project
 */


const ConnectionProfileSchema = {
  name: CONNECTION_LIST_SCHEMA,
  primaryKey: 'index',
  properties: {
    index: {type: 'int', default: 0},
    picture: 'string',
    age: 'int',
    firstname: 'string',
    surname: 'string',
    gender: 'string',
    company: 'string',
    email: 'string',
    phone: 'string',
  },
};

/**
 * This method handles data insertion to database
 * 
 */
export const PushDataToDB = async (connectionListJson) => {
  try {
    let connectionList = Array.from(
      JSON.parse(JSON.stringify(connectionListJson)),
    );

    Realm.open({schema: [ConnectionProfileSchema]}).then((realm) => {
      realm.write(() => {
        connectionList.forEach((connection) => {
          realm.create(CONNECTION_LIST_SCHEMA, connection, UpdateMode.All);
        });
      });
    });
    return true;
  } catch (error) {
    console.log('PushDataToDBCatch:', error);
    return false;
  }
};

/**
 * This method returns the data stored in list
 * Retuns empty if not data present
 */
export const GetDataFromDB = async () => {
  let connectionList = [];
  try {
    Realm.open({schema: [ConnectionProfileSchema]}).then((realm) => {
      const data = realm.objects(CONNECTION_LIST_SCHEMA);
      var connectionListTemp = JSON.parse(JSON.stringify(data));

      let connectionListSize = Object.keys(connectionListTemp).length;
      for (var count = 0; count < connectionListSize; count++) {
        var connectionProfile = Object.setPrototypeOf(
          connectionListTemp[count],
          ConnectionModel.prototype,
        );
        connectionList.push(connectionProfile);
      }
    });
  } catch (er) {
    connectionList = [];
    console.log(er);
  }
  return connectionList;
};

/**
 * Check if data is present
 */
export const checkIfDataPresent = async () => {
  var isDataPresent = false;
  try {
    isDataPresent = await Realm.open({schema: [ConnectionProfileSchema]}).then(
      (realm) => {
        return !(realm.objects(CONNECTION_LIST_SCHEMA).length === 0);
      },
    );
  } catch (error) {
    console.log(error);
    isDataPresent = false;
  }
  return isDataPresent;
};
