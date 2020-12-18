import React from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import {Card} from 'native-base';

/**
 * Connection profile screen
 * Shows details of connection
 */
export default class ConnectionProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionDetails: this.props.route.params.connectionProfile,
      cardProgress: new Animated.Value(0),
      imageAnimProgress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  /**
   * Start animation in screen
   */
  startAnimation = () => {
    Animated.timing(this.state.cardProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {});

    Animated.timing(this.state.imageAnimProgress, {
      toValue: 5,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {});
  };

  render() {
    const transformStyle = {
      transform: [
        {
          translateY: this.state.cardProgress,
        },
      ],
    };

    const transformImageStyle = {
      transform: [
        {
          translateY: this.state.imageAnimProgress,
        },
      ],
    };

    return (
      <ScrollView>
        <View style={Styles.mainView}>
          <Animated.View
            style={[
              Styles.imageView,
              transformImageStyle,
              {
                opacity: this.state.imageAnimProgress,
                transform: [
                  {
                    translateY: this.state.imageAnimProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 10],
                    }),
                  },
                ],
              },
            ]}>
            <Image
              source={{uri: this.state.connectionDetails.picture}}
              style={Styles.image}
            />
          </Animated.View>

          <Animated.View
            style={[
              transformStyle,
              {
                opacity: this.state.cardProgress,
                transform: [
                  {
                    translateY: this.state.cardProgress.interpolate({
                      inputRange: [0, 20],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
              ,
              Styles.cardView,
            ]}>
            <Card style={Styles.cardView}>
              <Text style={Styles.nameText}>
                {this.state.connectionDetails.firstname +
                  ' ' +
                  this.state.connectionDetails.surname}
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                {this.state.connectionDetails.company}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'center'}}>
                {this.state.connectionDetails.phone}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'center'}}>
                {this.state.connectionDetails.email}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'center'}}>
                Age {this.state.connectionDetails.age}
              </Text>
              <Text style={{fontSize: 14, textAlign: 'center', margin: 10}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
  mainView: {
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#D7D7D7',
  },
  imageView: {
    elevation: 10,
    height: 170,
    width: 170,
    backgroundColor: '#D7D7D7',
    justifyContent: 'center',
    borderRadius: 100,
  },
  cardView: {
    marginTop: 120,
    position: 'absolute',
    alignContent: 'center',
    width: Dimensions.get('window').width - 40,
    borderRadius: 5,
    elevation: 7,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
    width: Dimensions.get('window').width - 40,
  },
});
