import { View, Text } from 'react-native'
import React from 'react'

const ProductCard = ({ produto:{ title, thumbnail, price, amount, creator:{userName, avatar}} }) => {
  return (
    <View className="flex-col items-center px-4 mb-14">
      <Text className='text-2xl text-white'> videoCard </Text>
    </View>
  )
}

export default ProductCard