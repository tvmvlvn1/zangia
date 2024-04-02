import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';

import Student4 from '../../../assets/lottie/91736-exams.json';
import Student3 from '../../../assets/lottie/student3.json';
import Student2 from '../../../assets/lottie/student2.json';
import Student1 from '../../../assets/lottie/student1.json';

const Listschool = props => {
  const {title, degree} = props;

  let animation = React.createRef();

  useEffect(() => {
    animation.current.play();

    animation.current?.play(0, 120);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 150,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LottieView
          ref={animation}
          loop={true}
          style={{
            height: '90%',
            flex: 1,
            padding: 0,
          }}
          source={
            degree === 'doctor'
              ? Student1
              : degree === 'master'
              ? Student3
              : degree === 'bachelor'
              ? Student2
              : Student4
          }
        />
        <View style={styles.mini}>
          <View>
            <Text style={styles.schoolname}>{title}</Text>
            <Text style={styles.subname}>
              {degree === 'bachelor'
                ? 'Бакалавр'
                : degree === 'master'
                ? 'Магистр'
                : degree === 'doctor'
                ? 'Доктор'
                : 'Ерөнхий боловсролийн бүрэн дунд сургууль'}
            </Text>
          </View>
        </View>
        <View style={styles.procedure} />
      </View>
    </View>
  );
};

export default Listschool;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#eee',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowColor: '#c7c7c7',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 12,
  },
  procedure: {
    width: 50,
    height: 50,
    borderRadius: 180,
    borderWidth: 2,
    borderColor: '#eee',
    position: 'absolute',
    top: '35%',
    left: -30,
    backgroundColor: '#fff',
  },
  schoolname: {
    fontSize: 18,
    fontWeight: '700',
  },
  subname: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
    color: '#525252',
  },
  mini: {
    flex: 3,
    paddingLeft: 30,
  },
});
