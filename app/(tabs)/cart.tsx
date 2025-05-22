import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function cart() {
  const fixedPrice = 4.35;
  const [price,setPrice] = useState(fixedPrice);
  const [quantityInCart,setQuantityInCart] = useState(1);
  function decreaseNumberInCart() {
    if (quantityInCart != 1) {
      setQuantityInCart(quantityInCart - 1);
      setPrice(parseFloat(((quantityInCart - 1) * fixedPrice).toFixed(2)));
    }
  }
  function increaseNumberInCart() {
    setQuantityInCart(quantityInCart + 1);
    setPrice(parseFloat(((quantityInCart + 1) * fixedPrice).toFixed(2)));
  }
  return (
    <View className='flex-1 px-8 pt-8 ' style ={{backgroundColor: Colors.primary}}>
      <ScrollView showsVerticalScrollIndicator ={false}>
        <View className='h-[40px] flex flex-row'>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className='py-1'>
          <Ionicons name ="arrow-back" color ={Colors.inactiveTab} size ={28}/>
        </TouchableOpacity>
        <Text className='text-2xl text-white text-center py-1 font-bold ml-1'>Cart</Text>
      </View>
      <View className='border border-red-800 mt-5 h-[690px] flex flex-col gap-7'>
        <View className='h-[130px] rounded-xl bg-[#362c36] flex flex-row px-4 py-4'>
          <View className='w-[32%] rounded-xl'>
            <Image source ={require('@/assets/images/classic-cappuccino.png')} style ={{width: 100, height: 100,objectFit: "contain"}}/>
          </View>
          <View className='w-[68%] flex flex-col gap-2 pl-2'>
            <View className='h-[30px] flex flex-row justify-between'>
              <Text className='text-white text-xl'>Classic Cappuccino</Text>
              <Ionicons name ="trash" size ={26} color={Colors.delete}/>
            </View>
            <Text className='text-gray-400'>Fortified with Tradition</Text>
            <View className='flex flex-row justify-between mt-1'>
              <Text className='text-white font-bold text-2xl'>${price}</Text>
              <View className='w-[50%] flex flex-row justify-between'>
                <TouchableOpacity className='w-7 h-7 bg-[#efe3c8]' onPress={decreaseNumberInCart}>
                  <Ionicons name ="remove" size ={26}/>
                </TouchableOpacity>
                <Text className='text-2xl text-white'>{quantityInCart}</Text>
                <TouchableOpacity className='w-7 h-7 bg-[#efe3c8]' onPress={increaseNumberInCart}>
                  <Ionicons name ="add" size ={26}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}