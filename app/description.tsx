import { Colors } from '@/components/colors'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function description() {
  const {name,price,ratings,description,subTitle,isFavorite,isCart} = useLocalSearchParams();
  const [favorite,setFavorite] = useState(isFavorite ==="false");
  const [cart,setCart] = useState(isCart ==="false");
  const imageMap = {
  "Classic Cappuccino": require("@/assets/images/classic-cappuccino.png"),
  "Caramel Cappuccino": require("@/assets/images/caramel-cappuccino.png"),
  "Vanilla Cappuccino": require("@/assets/images/vanilla-cappuccino.png"),
  "HazeInut Cappuccino": require("@/assets/images/hazeinut-cappuccino.png"),
  "Mocha Cappuccino": require("@/assets/images/mocha-cappuccino.png"),
  "Chocolate Cappuccino": require("@/assets/images/chocolate-cappuccino.png"),
  "Cafè Latte": require("@/assets/images/cafe-latte.png"),
  "Vanilla Latte": require("@/assets/images/vanilla-latte.png"),
  "Caramel Brulée Latte": require("@/assets/images/caramel-bruless-latte.png"),
  "Pumpkin Spice Latte": require("@/assets/images/pumpkin-spice-latte.png"),
  "Iced Lavender Oatmilk Latte": require("@/assets/images/iced-lanvender-oatmilk-latte.png"),
  "Peppermint Mocha Latte": require("@/assets/images/peppermint-mocha-latte.png"),
  "Caffè Americano": require("@/assets/images/caffe-americano.png"),
  "Iced Caffè Americanos": require("@/assets/images/iced-caffe-americano.png"),
  "Viennese Americano": require("@/assets/images/viennese-americano.png"),
  "Decaf Americano": require("@/assets/images/decaf-americano.png"),
  "Americano Misto": require("@/assets/images/americano-misto.png"),
  "Almondmilk Americano": require("@/assets/images/almondmilk-americano.png"),
  "Espresso Macchiato": require("@/assets/images/espresso-macchiato.png"),
  "Cortado": require("@/assets/images/cortado.png"),
  "Flat White": require("@/assets/images/flat-white.png"),
  "Caramel Macchiato": require("@/assets/images/caramel-macchiato.png"),
  "Caffè Mocha": require("@/assets/images/caffe-mocha.png"),
  "Iced Shaken Espresso": require("@/assets/images/ice-shaken-espresso.png"),
};

const imageSource = imageMap[name as keyof typeof imageMap];
  return (
    <View className ='flex-1 px-8 pt-5' style = {{backgroundColor: Colors.primary}}>
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View className='h-[450px] rounded-xl'>
              <Image source={imageSource} style={{ width: 400, height: 480, objectFit: 'contain' }} className='mx-auto' />
                <View className='rounded-full h-12 w-12 top-[-460px] p-1'>
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' color={Colors.inactiveTab} size ={32}></Ionicons>
                  </TouchableOpacity>
                </View>
            </View>
            <View className='mt-[30px] h-[80px] flex flex-row'>
              <View className='w-[80%] h-[80px]'>
                <Text className='text-white text-2xl font-bold'>{name}</Text>
                <View className='flex flex-row mt-2 '>
                  <View className='w-[70%] pt-2'>
                    <Text className='text-white text-xl'>{subTitle}</Text>
                  </View>
                  <View className='w-[30%] p-2 flex flex-row'>
                    <Ionicons name ="star" size ={24} color ={Colors.star}/>
                    <Text className='text-white text-xl ml-2'>{ratings}</Text>
                  </View>
                </View>
              </View>
              <View className='w-[20%] h-[80px] p-5'>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                  {favorite ? <Ionicons name='heart' size={40} color ={Colors.tertiary}/>: <Ionicons name='heart' size={40} color ={Colors.inactiveTab}/> }
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text className='text-gray-400 text-xl'>{description}</Text>
            </View>
      </ScrollView>
      <View className='h-[65px] mb-3 flex flex-row'>
        <View className='w-[20%] flex flex-column'>
          <Text className='text-white text-xl'>Price</Text>
          <Text className='text-white text-2xl mt-2 font-bold'>${price}</Text>
        </View>
        <View className='w-[80%] my-auto'>
          {cart ? <TouchableOpacity className='bg-[#efe3c8] rounded-xl p-5 w-[80%] ml-[55px]' onPress={()=> setCart(!cart)}>
            <Text className='text-center text-xl font-bold'>Add to Cart</Text>
          </TouchableOpacity> : <TouchableOpacity className='rounded-xl p-5 w-[80%] ml-[55px]' style ={{backgroundColor: Colors.inactiveTab}}onPress={()=> setCart(!cart)}>
            <Text className='text-center text-2xl font-bold'>Remove from Cart</Text>
          </TouchableOpacity>}
          
        </View>
      </View>
    </View>
  )
}