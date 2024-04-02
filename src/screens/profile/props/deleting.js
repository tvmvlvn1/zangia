import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const Deleting = () => {
  let animation = React.createRef();

  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <View style={styles.improveContainer}>
      <LottieView
        ref={animation}
        loop={true}
        style={{
          width: 150,
          height: 150,
        }}
        source={require('../../../assets/lottie/deleting.json')}
      />
    </View>
  );
};

export default Deleting;

const styles = StyleSheet.create({
  improveContainer: {
    position: 'absolute',
    width,
    height,
    zIndex: 99999,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingTop: height / 3,
    zIndex: 100,
  },
});
