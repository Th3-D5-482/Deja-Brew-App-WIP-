import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

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
      </ScrollView>
    </View>
  )
}