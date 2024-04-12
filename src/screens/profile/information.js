import {TouchableOpacity, Text, View, Image} from 'react-native';
import React from 'react';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Information = ({ user, navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <View 
        style={{
          elevation: 2, 
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5, 
          backgroundColor: '#fff', 
          padding: 20, 
          borderRadius: 16,
          paddingBottom: 5
        }}
      >
        <Text style={{ color: "#000", fontFamily: "Montserrat-Bold", marginBottom: 5, fontSize: 16 }}>
          Ажилтан
        </Text>
        <View style={{ padding: 5 }}>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/new-file.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Үндсэн мэдээлэл
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('EditInformationStack')} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/user.png")}
                style={{ width: 22, height: 22 }}
              />
              <Text style={{ marginLeft: 11, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Хувийн мэдээлэл
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignatureStack')} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/agreement.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Гарын үсэг
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View 
        style={{
          elevation: 2, 
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5, 
          backgroundColor: '#fff', 
          padding: 20, 
          borderRadius: 16,
          marginTop: "5%",
          paddingBottom: 5
        }}
      >
        <Text style={{ color: "#000", fontFamily: "Montserrat-Bold", marginBottom: 5, fontSize: 16 }}>
          Мэдэгдэл
        </Text>
        <View style={{ padding: 5 }}>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/notification.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Pop-up Notification
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View 
        style={{
          elevation: 2, 
          shadowColor: "#1D1617",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5, 
          backgroundColor: '#fff', 
          padding: 20, 
          borderRadius: 16,
          marginTop: "5%",
          paddingBottom: 5
        }}
      >
        <Text style={{ color: "#000", fontFamily: "Montserrat-Bold", marginBottom: 5, fontSize: 16 }}>
          Бусад
        </Text>
        <View style={{ padding: 5 }}>
          <TouchableOpacity onPress={() => navigation.navigate('RuleStack')} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/cyber-security.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Дүрэм, журам стандарт
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AbtStack')} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/shield.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Ажлын байрны тодорхойлолт
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SalaryStack')} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/income.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ marginLeft: 8, fontFamily: "Montserrat-Regular", color: "#63575A" }}>
                Цалингийн мэдээ
              </Text>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={14}
              color={'#63575A'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Information;
