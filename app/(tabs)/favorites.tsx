import { Colors } from '@/components/colors'
import { firebaseConfig } from '@/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { initializeApp } from 'firebase/app'
import { get, getDatabase, onValue, ref, remove, update } from 'firebase/database'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface cartItem {
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

export default function cart() {
  let [total,setTotal] = useState(0);
  const [cartData,setCartData] = useState<cartItem[]>();
  let [price, setPrice] = useState(0);
  let [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef  = ref(database,"Cart");
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
          const newNumberInCart = (data[itemKey].numberInCart) + 1;
          const newPrice = ((data[itemKey].fixedPrice) * newNumberInCart).toFixed(2);
          update(itemRef,{numberInCart: newNumberInCart});
          update(itemRef,{changedPrice: newPrice});
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
          const newPrice = ((data[itemKey].fixedPrice) * newNumberInCart).toFixed(2);
          update(itemRef, { numberInCart: newNumberInCart });
          update(itemRef, { changedPrice: newPrice });
        }
      }
    },{onlyOnce: true});
  }

  function deleteCart(targetID: String) {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database,"Cart");
    get(cartRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === targetID);
        if (itemKey) {
          const itemRef = ref(database, `Cart/${itemKey}`);
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
              <Text className='text-2xl text-white text-center py-1 font-bold ml-1'>Cart</Text>
            </View>
            <View className='mt-5 max-h-max flex flex-col gap-7'>
              {
                cartData?.map((item, index) => {
                  price = Number(item.changedPrice);
                  quantityInCart = Number(item.numberInCart);
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
            </View>
          </ScrollView>
          </>
          ): <Text className='text-white text-2xl font-bold  my-auto text-center'>No Favoties Yet</Text>
        }
    </View>
  )
} 

