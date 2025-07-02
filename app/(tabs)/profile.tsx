import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'


export default function profile() {
  const [tapCount, setTapCount] = useState(1);
  const [name,setName] = useState('');

  function handleTaps() {
    setTapCount(preCount => {
      if (preCount === 7) {
        router.push('/about');
        return 1;
      }
      return preCount + 1;
    })
  }

  function handleNameChange(text: string) {
    const filtered = text
    .split('')
    .filter(char => /^[A-Za-z\s]$/.test(char))
    .join('');

    setName(filtered);
  }

  return (
    <View className='flex-1 px-8 pt-8' style={{ backgroundColor: Colors.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='h-[40px] flex flex-row'>
          <TouchableOpacity onPress={() => router.push('/(tabs)')} className='py-1'>
            <Ionicons name="arrow-back" color={Colors.inactiveTab} size={28} />
          </TouchableOpacity>
          <TouchableOpacity className='py-1 ml-1' onPress={handleTaps}>
            <Text className='text-2xl text-white text-center font-bold'>Profile</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('@/assets/images/Th3_D5_482.jpeg')} style={{ width: 250, height: 250, objectFit: 'contain' }} className='mx-auto mt-10 rounded-full' />
        <View className='border border-red-800 mt-10 h-[500px]'>
          <Text className='text-white text-2xl mx-auto'>Full Name</Text>
        <TextInput className =' mt-8 bg-white rounded-xl' placeholder='Enter your full name' onChangeText={handleNameChange} autoCapitalize='words'/>
        </View>
      </ScrollView>
    </View>
  )
}