import React, { useEffect, useReducer, useRef } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Svg, { Path } from 'react-native-svg'
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
import Lottie from 'lottie-react-native'
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../screens/Home'
import IdCardScreen from '../../screens/IdCard';
import QrScreen from '../../screens/qr/TimeQr';
import Profile from '../../screens/profile';

import Rule from '../../screens/rule';
import RuleView from '../../screens/rule/RuleView';
import RuleFilter from '../../screens/rule/filter';

//Abt router
import Abt from '../../screens/abt';
import AbtView from '../../screens/abt/AbtView';

//Restock router
import Restock from '../../screens/restock';
import RestockList from '../../screens/restock/RestockList';
import RestockView from '../../screens/restock/RestockView';

// Profile router
import Self from '../../screens/profile/edit/self';
import EditEducation from '../../screens/profile/edit/education';

import Signature from '../../screens/profile/signature';
import RegisterSignature from '../../screens/profile/signature/registerSignature';

import Family from '../../screens/profile/edit/family';

import DependentMember from '../../screens/profile/edit/dependentMember';

import AddressScreen from '../../screens/profile/edit/address';

//Absence Request
import Absence from '../../screens/absence/index';
import AbsenceDetail from '../../screens/absence/detail';
import CreateAbsenceRequest from '../../screens/absence/createRequest';

// Position router
import Position from '../../screens/position';

// Phone router
import Phone from '../../screens/phone';
import PhoneDetail from '../../screens/phone/detail';

import TimeSheetScreen from '../../screens/Timesheet';
import SalaryScreen from '../../screens/salary';
import CompScreen from '../../screens/comp';
import DetailCompScreen from '../../screens/comp/detail';
import GeneralInfoStack from "../../screens/profile/general"
import CalendarStack from "../../screens/calendar"

const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="HomeStack"
    screenOptions={{
      headerShown: false,
    }}>
    <HomeStack.Group>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
      />

      <HomeStack.Screen
        name="TimeSheetStack"
        component={TimeSheetScreen}
      />

      <HomeStack.Screen
        name="CalendarStack"
        component={CalendarStack}
      />

      <HomeStack.Screen
        name="SalaryStack"
        component={SalaryScreen}
      />

      <HomeStack.Screen
        name="JobPosition"
        component={Position}
      /> 

      <HomeStack.Screen
        name="CompScreen"
        component={CompScreen}
      />

      <HomeStack.Screen
        name="DetailCompScreen"
        component={DetailCompScreen}
      />
      {/* Дүрэм журам */}
      <HomeStack.Screen
        name="RuleStack"
        component={Rule}
      />
      <HomeStack.Screen
        name="RuleViewStack"
        component={RuleView}
      />
      <HomeStack.Screen
        name="RuleFilterStack"
        component={RuleFilter}
      />

      {/* Ажлын байрны тодорхойлолт */}
      <HomeStack.Screen
        name="AbtStack"
        component={Abt}
      />
      <HomeStack.Screen
        name="AbtViewStack"
        component={AbtView}
      />

      {/* Дэлгүүрийн өрөлт */}
      <HomeStack.Screen
        name="RestockStack"
        component={Restock}
      />
      <HomeStack.Screen
        name="RestockListStack"
        component={RestockList}
      />
      <HomeStack.Screen
        name="RestockViewStack"
        component={RestockView}
      />

      {/* Ажилтны мэдээлэл */}
      <HomeStack.Screen
        name="GeneralInfoStack"
        component={GeneralInfoStack}
      />
      <HomeStack.Screen
        name="UserProfileStack"
        component={Profile}
      />
      <HomeStack.Screen
        name="EditInformationStack"
        component={Self}
      />
      <HomeStack.Screen
        name="EditEducationStack"
        component={EditEducation}
      />

      <HomeStack.Screen
        name="SignatureStack"
        component={Signature}
      />
      <HomeStack.Screen
        name="RegisterSignatureStack"
        component={RegisterSignature}
      />

      <HomeStack.Screen
        name="FamilyStack"
        component={Family}
      />

      <HomeStack.Screen
        name="RelationStack"
        component={DependentMember}
      />

      <HomeStack.Screen
        name="AddressStack"
        component={AddressScreen}
      />

      {/* Чөлөөний хүсэлт */}
      <HomeStack.Screen
        name="AbsenceRequest"
        component={Absence}
      />
      <HomeStack.Screen
        name="AbsenceRequestDetail"
        component={AbsenceDetail}
      />
      <HomeStack.Screen
        name="CreateAbsence"
        component={CreateAbsenceRequest}
      />

      <HomeStack.Screen
        name="PhoneStack"
        component={Phone}
      />
      <HomeStack.Screen
        name="PhoneDetailStack"
        component={PhoneDetail}
      />
    </HomeStack.Group>

    <HomeStack.Group
      screenOptions={{presentation: 'transparentModal', headerShown: false}}>
      <HomeStack.Screen name="IdCardScreen" component={IdCardScreen} />
    </HomeStack.Group>
  </HomeStack.Navigator>
);

const App = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./constants/home.icon.json')} style={{ width: 26, height: 26 }} />,
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="QR"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./constants/qr.json')} style={{ width: 70, height: 70 }} />,
        }}
        component={QrScreen}
      />
      <Tab.Screen
        name="IdCard"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={true} source={require('./constants/idCard.json')} style={{ width: 50, height: 50 }} />,
        }}
        component={IdCardScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./constants/user.json')} style={{ width: 27, height: 27, marginTop: 3 }} />,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  )
}

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors } : BottomTabBarProps) => {
  const reducer = (state: any, action: { x: number, index: number }) => {
    return [...state, { x: action.x, index: action.index }]
  }
  const [layout, dispatch] = useReducer(reducer, [])
  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: 10 }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill="#fff"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    </View>
  )
}

type TabBarComponentProps = {
  active?: boolean
  options: BottomTabNavigationOptions
  onLayout: (e: LayoutChangeEvent) => void
  onPress: () => void
}

const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F5F5F5',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default App;
