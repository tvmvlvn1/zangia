import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Index = ({ name, navigation }) => {
  return (
      <View style={{ flexDirection: "row", padding: 15, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SimpleLineIcons
            name='arrow-left'
            size={14}
            color={'#1D1617'}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", fontSize: 16, textAlign: 'center', width: "95%" }}>
          {name}
        </Text>
      </View>
  );
};

export default Index;
