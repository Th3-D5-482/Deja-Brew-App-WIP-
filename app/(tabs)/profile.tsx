import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function profile() {
  return (
    <View className='flex-1 px-8 pt-8' style ={{backgroundColor: Colors.primary}}>
      <View className='h-[40px] flex flex-row'>
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className='py-1'>
          <Ionicons name ="arrow-back" color ={Colors.inactiveTab} size ={32}/>
        </TouchableOpacity>
        <Text className='text-3xl text-white text-center py-1 font-bold'> Profile</Text>
      </View>
      <View className='mt-8 h-[680px]'>
        <View className='h-[250px] w-[250px] border border-purple-800 rounded-full p-1 overflow-hidden mx-auto mt-8'>
          <Image source ={{uri: 'https://ik.imagekit.io/j7iwyd9ys/Deja%20Brew/Th3_D5_482.jpeg?updatedAt=1747756993672'}} style ={{width: 240, height: 240, objectFit: 'contain'}}/>
        </View>
        <Text className='text-white text-3xl text-center mt-5 font-bold'>Th3_D5_482</Text>
        <Text className='text-xl mx-2 mt-3 text-gray-400'> "I'm an innovative software developer passionate about creating efficient, user-friendly applications. With a strong background in various programming languages, I excel at solving complex problems and turning ideas into reality. I'm committed to continuous learning and delivering top-notch solutions that exceed expectations."</Text>
        <TouchableOpacity className='h-[50px] border border-yellow-800 rounded-xl mt-8 bg-[#efe3c8] mx-2 py-3' onPress={() => router.push('/(tabs)')}>
          <Text className='text-center text-2xl font-bold'>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}