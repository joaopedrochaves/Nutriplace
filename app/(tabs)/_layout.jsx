import { View, Text, Image } from 'react-native'
import {Tabs, Redirect, } from 'expo-router'

import { icons } from "../../constants";

const TabIcon = ({icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-1'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs` }>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs 
      screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor: '#346bff',
        tabBarInactiveTintColor: '#cdcde0',
        tabBarStyle:{
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height:83
        }
      }}    
    >
      <Tabs.Screen 
        name="produtos"
      options={{
        title: 'Produtos',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
        <TabIcon
          icon= {icons.produtos}
          color={color}
          name="Produtos"
          focused={focused}
        /> 
      )
      }}
      />

<Tabs.Screen 
        name="criar"
      options={{
        title: 'Adicionar',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
        <TabIcon
          icon= {icons.plus}
          color={color}
          name="Adicionar"
          focused={focused}
        /> 
      )
      }}
      />

      <Tabs.Screen 
        name="historico"
      options={{
        title: 'historico',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
        <TabIcon
          icon= {icons.bookmark}
          color={color}
          name="historico"
          focused={focused}
        /> 
      )
      }}
      />

<Tabs.Screen 
        name="profile"
      options={{
        title: 'profile',
        headerShown: false,
        tabBarIcon: ({color, focused}) => (
        <TabIcon
          icon= {icons.profile}
          color={color}
          name="profile"
          focused={focused}
        /> 
      )
      }}
      />
      
      
    </Tabs>
    </>
  )
}

export default TabsLayout