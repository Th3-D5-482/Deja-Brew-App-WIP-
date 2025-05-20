import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function profile() {
  return (
    <View className='flex-1 px-8 pt-8' style ={{backgroundColor: Colors.primary}}>
      <ScrollView showsVerticalScrollIndicator ={false}>
        <View className='h-[40px] flex flex-row'>
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Ionicons name ="arrow-back" color ={Colors.inactiveTab} size ={32}/>
          </TouchableOpacity>
          <Text className='text-3xl text-white ml-32 py-1 font-bold'>Profile</Text>
        </View>
      </ScrollView>
    </View>
  )
}