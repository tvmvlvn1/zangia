import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Index = ({ name, navigation }) => {
  return (
      <View style={{ flexDirection: "row", padding: 15, alignItems: "center" }}>
        <TouchableOpacity style={{ padding: 7, backgroundColor: "#F7F8F8", borderRadius: 8 }} onPress={() => navigation.goBack()}>
          <SimpleLineIcons
            name='arrow-left'
            size={16}
            color={'#1D1617'}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Montserrat-Bold", color: "#000", fontSize: 17, textAlign: 'center', width: "80%" }}>
          {name}
        </Text>
      </View>
  );
};

export default Index;
