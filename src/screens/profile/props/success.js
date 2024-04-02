import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const Success = props => {
  const {setGetSuccess, onPress, page} = props;

  let animation = React.createRef();

  useEffect(() => {
    animation.current.play();

    animation.current?.play(0, 120);
  }, []);

  return (
    <View style={styles.improveContainer}>
      <View style={{height}}>
        <TouchableOpacity onPress={() => setGetSuccess(false)}>
          <AIcon name="close" style={styles.closeBtn} />
        </TouchableOpacity>
        <View style={styles.gifContainer}>
          <View
            style={{
              paddingHorizontal: 50,
              marginBottom: 60,
            }}>
            <Text style={{fontSize: 28, color: '#fff', fontWeight: '700'}}>
              Амжилттай
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontWeight: '400',
                marginTop: 8,
              }}>
              Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ
            </Text>
          </View>
          <LottieView
            ref={animation}
            loop={false}
            style={{
              width: width / 2,
              height: 200,
            }}
            source={require('../../../assets/lottie/Completed.json')}
          />
        </View>
        {!page && (
          <>
            <View style={{alignItems: 'flex-end', marginBottom: 150}}>
              <TouchableOpacity onPress={onPress}>
                <MIcon name="keyboard-arrow-right" style={styles.leftBtn} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  improveContainer: {
    position: 'absolute',
    width,
    height,
    zIndex: 99999,
    backgroundColor: '#3b5998',
    padding: 24,
  },
  gifContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  closeBtn: {
    color: '#fff',
    fontSize: 24,
  },
  leftBtn: {
    color: '#3b5998',
    fontSize: 60,
    backgroundColor: '#fff',
    padding: 3,
    borderRadius: 180,
  },
});
