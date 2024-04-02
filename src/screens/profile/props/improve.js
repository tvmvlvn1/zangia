import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const Improve = () => {
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
        source={require('../../../assets/lottie/Loader.json')}
      />
    </View>
  );
};

export default Improve;

const styles = StyleSheet.create({
  improveContainer: {
    position: 'absolute',
    width,
    height,
    zIndex: 99999,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingTop: height / 3,
  },
});
