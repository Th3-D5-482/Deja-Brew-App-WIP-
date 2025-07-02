import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { Component } from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'

export default class about extends Component {
  render() {
    return (
      <View className='flex-1 px-8 pt-8' style={{ backgroundColor: Colors.primary }}>
        <View className='h-[40px] flex flex-row'>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} className='py-1'>
            <Ionicons name="arrow-back" color={Colors.inactiveTab} size={28} />
          </TouchableOpacity>
          <Text className='text-2xl text-white text-center font-bold py-1 ml-1'>About Me</Text>
        </View>
        <View className='mt-5 h-[680px]'>
          <View className='h-[250px] w-[250px] rounded-full p-1 overflow-hidden mx-auto mt-8'>
            <Image source={require('@/assets/images/Th3_D5_482.jpeg')} style={{ width: 250, height: 250, objectFit: 'contain' }} />
          </View>
          <Text className='text-white text-3xl text-center mt-5 font-bold'>Th3_D5_482</Text>
          <Text className='text-xl mx-2 mt-3 text-gray-400'> "I'm an innovative software developer passionate about creating efficient, user-friendly applications. With a strong background in various programming languages, I excel at solving complex problems and turning ideas into reality. I'm committed to continuous learning and delivering top-notch solutions that exceed expectations."</Text>
          <TouchableOpacity className='h-[50px] border border-yellow-800 rounded-xl mt-8 bg-[#efe3c8] mx-2 py-3 flex flex-row px-[30%]' onPress={() => { Linking.openURL('https://github.com/Th3-D5-482'); }} >
            <Ionicons name="logo-github" size={32} />
            <Text className='text-center text-xl font-bold my-auto ml-2'>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}