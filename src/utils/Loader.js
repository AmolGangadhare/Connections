import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator, Text} from 'react-native';

const Loader = (props) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text>{props.message}</Text>
          <ActivityIndicator animating={true} color="grey" size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
