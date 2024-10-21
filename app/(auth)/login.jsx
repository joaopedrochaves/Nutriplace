import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import{ images } from '../../constants'

const Login = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} recizeMode='contain' className='w-[115px] h=[35px]'/>
        </View>
        
    </ScrollView>
    </SafeAreaView>
  )
}

export default Login