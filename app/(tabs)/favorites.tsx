import { Colors } from '@/components/colors'
import { firebaseConfig } from '@/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { initializeApp } from 'firebase/app'
import { get, getDatabase, onValue, ref, remove } from 'firebase/database'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface favoritesItem {
  catID: number;
  description: string;
  id: number;
  image: string;
  name: string;
  fixedPrice: number;
  ratings: number;
  subTitle: string;
  numberInCart: number;
  changedPrice: number;
}

export default function favorites() {
  let [total,setTotal] = useState(0);
  const [cartData,setCartData] = useState<favoritesItem[]>();
  let [price, setPrice] = useState(0);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef  = ref(database,"Favorites");
    const reRun = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      setCartData(data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key], 
        })): []);
      return () => reRun();
    })
  },[])

  useEffect(()=> {
    let totalAmount = 8; 
    cartData?.forEach(item => {
      totalAmount += Number(item.changedPrice);
    });
    setTotal(totalAmount);
  },[cartData])

  function deleteCart(targetID: String) {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database,"Favorites");
    get(cartRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === targetID);
        if (itemKey) {
          const itemRef = ref(database, `Favorites/${itemKey}`);
          remove(itemRef);
        }
      }
    });
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
              <Text className='text-2xl text-white text-center py-1 font-bold ml-1'>Favorites</Text>
            </View>
            <View className='mt-5 max-h-max flex flex-col gap-7'>
              {
                cartData?.map((item, index) => {
                  price = Number(item.fixedPrice);
                  return (
                    <View className='h-[130px] rounded-xl bg-[#362c36] flex flex-row px-4 py-4' key={index}>
                      <View className='w-[32%] rounded-xl'>
                        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, objectFit: "contain" }} />
                      </View>
                      <View className='w-[68%] flex flex-col gap-2 pl-2'>
                        <View className='h-[30px] flex flex-row justify-between'>
                          <Text className='text-white text-xl'>{item.name}</Text>
                          <Ionicons name="trash" size={26} color={Colors.delete} onPress={() => deleteCart(String(item.id))} />
                        </View>
                        <Text className='text-gray-400'>{item.subTitle}</Text>
                        <View className='flex flex-row justify-between mt-1'>
                          <Text className='text-white font-bold text-2xl'>${price.toFixed(2)}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
          </>
          ): <Text className='text-white text-2xl font-bold  my-auto text-center'>No Favoties Yet</Text>
        }
    </View>
  )
} 

