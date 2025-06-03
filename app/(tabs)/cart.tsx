import { Colors } from '@/components/colors'
import { firebaseConfig } from '@/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface cartItem {
  catID: number;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  ratings: number;
  subTitle: string;
  numberInCart: number;
}

export default function cart() {
  let [total,setTotal] = useState(0);
  const [cartData,setCartData] = useState<cartItem[]>();
  let [price, setPrice] = useState(0);
  let [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const cartRef = ref(database, "Cart");
      const reRun = onValue (cartRef, (snapshot) => {
        const data = snapshot.val();
        setCartData(data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        })): []);
      })
      return () => reRun();
  },[]);


  function incrementCart(targetID: string) {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database, "Cart");
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === targetID);
        if (itemKey) {
          const itemRef = ref(database,`Cart/${itemKey}`);
          const newNumberInCart = (data[itemKey].numberInCart)+1;
          update(itemRef,{numberInCart: newNumberInCart})
        }
      }
    }, { onlyOnce: true });
  }
  
  function decrementCart(targetID: string) {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database,"Cart");
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === targetID);
        if (itemKey && data[itemKey].numberInCart > 1) {
          const itemRef = ref(database, `Cart/${itemKey}`);
          const newNumberInCart = (data[itemKey].numberInCart) - 1;
          update(itemRef, { numberInCart: newNumberInCart })
        }
      }
    },{onlyOnce: true});
  }

  return (
    <View className='flex-1 px-8 pt-8 ' style={{ backgroundColor: Colors.primary }}>
      { (cartData?.length ?? 0) > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className='h-[40px] flex flex-row'>
              <TouchableOpacity onPress={() => router.push('/(tabs)')} className='py-1'>
                <Ionicons name="arrow-back" color={Colors.inactiveTab} size={28} />
              </TouchableOpacity>
              <Text className='text-2xl text-white text-center py-1 font-bold ml-1'>Cart</Text>
            </View>
            <View className='mt-5 max-h-max flex flex-col gap-7'>
              {
                cartData?.map((item, index) => {
                  price = Number(item.price);
                  quantityInCart = Number(item.numberInCart);
                  return (
                    <View className='h-[130px] rounded-xl bg-[#362c36] flex flex-row px-4 py-4' key={index}>
                      <View className='w-[32%] rounded-xl'>
                        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, objectFit: "contain" }} />
                      </View>
                      <View className='w-[68%] flex flex-col gap-2 pl-2'>
                        <View className='h-[30px] flex flex-row justify-between'>
                          <Text className='text-white text-xl'>{item.name}</Text>
                          <Ionicons name="trash" size={26} color={Colors.delete} />
                        </View>
                        <Text className='text-gray-400'>{item.subTitle}</Text>
                        <View className='flex flex-row justify-between mt-1'>
                          <Text className='text-white font-bold text-2xl'>${price.toFixed(2)}</Text>
                          <View className='w-[50%] flex flex-row justify-between'>
                            <TouchableOpacity className='w-7 h-7 bg-[#efe3c8]' onPress={() => decrementCart(String(item.id))}>
                              <Ionicons name="remove" size={26} />
                            </TouchableOpacity>
                            <Text className='text-2xl text-white'>{quantityInCart}</Text>
                            <TouchableOpacity className='w-7 h-7 bg-[#efe3c8]' onPress ={() => incrementCart(String(item.id))}>
                              <Ionicons name="add" size={26} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
              <Text className='text-gray-400 text-5xl'>- - - - - - - - - - - - - - - - </Text>
              <View className='h-[70px] top-[-20px]'>
                <View className='flex flex-row justify-between'>
                  <Text className='text-white text-xl'>Delivery Charges</Text>
                  <Text className='text-white text-xl font-bold'>$5</Text>
                </View>
                <View className='flex flex-row justify-between pt-4'>
                  <Text className='text-white text-xl'>Taxes</Text>
                  <Text className='text-white text-xl font-bold'>$3</Text>
                </View>
                <Text className='text-gray-400 text-5xl'>- - - - - - - - - - - - - - - - </Text>
              </View>
            </View>
          </ScrollView>
          <Text className='text-gray-400 text-5xl'>- - - - - - - - - - - - - - - - </Text>
          <View className='h-[100px]'>
            <View className='flex flex-row justify-between mb-2'>
              <Text className='text-white text-2xl'>Grand Total</Text>
              <Text className='text-white text-2xl font-bold'>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity className='h-[50px] rounded-xl mb-5 bg-[#efe3c8] py-4 mt-3'>
              <Text className='text-center text-xl font-bold'>Pay Now</Text>
            </TouchableOpacity>
          </View>
          </>
          ): <Text className='text-white text-2xl font-bold  my-auto text-center'>Your Cart is Empty</Text>
        }
    </View>
  )
} 

