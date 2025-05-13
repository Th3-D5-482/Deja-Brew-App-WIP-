import { Colors } from '@/components/colors'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

export default function favorites() {
  return (
    <View className='flex-1 px-16 pt-32 md:pt-5' style ={{backgroundColor: Colors.primary}}>
      <ScrollView showsVerticalScrollIndicator ={false}>
        <Text className='text-white text-[24px] text-center font-bold underline mb-32'>Project: Lyon</Text>
        <Image source={require('@/assets/images/cofee_cup.png')} style = {{width: 300, height: 300}}className='relative mb-32 mx-auto'/>
        <Text className='text-white text-[24px] text-center font-bold underline mb-5'>Work In Progress</Text>
        <Text className='text-[20px] text-center text-white'>By: Th3_D5_482</Text>
      </ScrollView>
    </View>
  )
}