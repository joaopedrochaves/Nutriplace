import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { ID } from 'react-native-appwrite';

const formatNumber = (num) => {
  return num.toLocaleString('pt-BR');  // 'pt-BR' formata com ponto como separador de milhar e vírgula para decimais
};

const ProductCard = ({ produto:{ id, title, thumbnail, price, amount, creator:{userName, avatar}} }) => {

  return (
    <TouchableOpacity onPress={() => {

      if(!id){
        return Alert.alert('error, produto não encontrado')
      }
      else router.push(`/produto/${ id }`)

    }}
    
    className="flex-col items-center mb-5 w-[30%]">
          <View className="w-[100px] h-[100px] rounded-lg border border-secondary justify-center items-center mb-2">
            <Image source={{uri: thumbnail}} className="w-full h-full rounded-lg" resizeMode='cover' />
          </View>
          <View className="items-center">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
            <Text className="text-gray-400 font-medium text-xs" numberOfLines={1}>{`Preço: R$${formatNumber(price)}`}</Text>
            <Text className="text-gray-400 font-medium text-xs" numberOfLines={1}>{`Quant: ${formatNumber(amount)}`}</Text>
          </View>


    </TouchableOpacity>
  )
}

export default ProductCard