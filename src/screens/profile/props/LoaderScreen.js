import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';

const LoaderScreen = () => {
  let animation = React.createRef();

  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <View style={styles.LoadingContainer}>
      <LottieView
        ref={animation}
        loop={true}
        style={{
          width: 150,
          height: 150,
        }}
        source={require('../../../assets/lottie/loading.json')}
      />
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
});
