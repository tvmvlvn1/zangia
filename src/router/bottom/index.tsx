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
import AddNewProduct from "../../screens/productDetail/add"
import EditProduct from "../../screens/productDetail/edit"
import ProductDetail from "../../screens/productDetail"
import Favourite from '../../screens/favourite';
import Profile from '../../screens/profile';

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
        name="AddNewProduct"
        component={AddNewProduct}
      />
      <HomeStack.Screen
        name="EditProduct"
        component={EditProduct}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
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
        name="IdCard"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./constants/heart.json')} style={{ width: 50, height: 50 }} />,
        }}
        component={Favourite}
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
