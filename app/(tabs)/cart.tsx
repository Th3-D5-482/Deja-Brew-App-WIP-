import { Colors } from '@/components/colors'
import { testDatabase } from '@/testDatabase'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function cart() {
  return (
    <View className='flex-1 px-8 pt-8 ' style ={{backgroundColor: Colors.primary}}>
      <ScrollView showsVerticalScrollIndicator ={false}>
        <View className='h-[40px] flex flex-row'>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className='py-1'>
          <Ionicons name ="arrow-back" color ={Colors.inactiveTab} size ={28}/>
        </TouchableOpacity>
        <Text className='text-2xl text-white text-center py-1 font-bold ml-1'>Cart</Text>
      </View>
      <View className='mt-5 max-h-max flex flex-col gap-7'>
        {
          testDatabase.map((item,index) => {
            const [price,setPrice] = useState(item.price * item.numberInCart);
            const [quantityInCart,setQuantityInCart] = useState(item.numberInCart);
            function decreaseNumberInCart() {
              if (quantityInCart != 1) {
                setQuantityInCart(quantityInCart - 1);
                setPrice(parseFloat(((quantityInCart - 1) * item.price).toFixed(2)));
              }
            }
            function increaseNumberInCart() {
              setQuantityInCart(quantityInCart + 1);
              setPrice(parseFloat(((quantityInCart + 1) * item.price).toFixed(2)));
            }
            return testDatabase.length ? (
              <View className='h-[130px] rounded-xl bg-[#362c36] flex flex-row px-4 py-4' key ={index}>
              <View className='w-[32%] rounded-xl'>
                <Image source ={{uri: item.image}} style ={{width: 100, height: 100,objectFit: "contain"}}/>
              </View>
              <View className='w-[68%] flex flex-col gap-2 pl-2'>
                <View className='h-[30px] flex flex-row justify-between'>
                  <Text className='text-white text-xl'>{item.name}</Text>
                  <Ionicons name ="trash" size ={26} color={Colors.delete}/>
              </View>
              <Text className='text-gray-400'>{item.subTitle}</Text>
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
            ) : 
            <Text>Hello World</Text>
          }) 
        } 
      </View>
      </ScrollView>
      <View>
        <TouchableOpacity className='h-[60px] rounded-xl mb-5 bg-[#efe3c8] py-4'>
          <Text className='text-center text-2xl font-bold'>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}