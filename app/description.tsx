import { Colors } from '@/components/colors'
import { firebaseConfig } from '@/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface coffeeItem {
  id: number;
}

export default function description() {
  const {image,name,price,ratings,description,subTitle,id,catId} = useLocalSearchParams();
  const [cartData,setCartData] = useState<coffeeItem[]>();
  const [favoriteData,setFavoriteData] = useState<coffeeItem[]>();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database, "Cart");
    const reRun = onValue (cartRef, (snapshot) => {
      const data = snapshot.val();
      setCartData(data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })): [])
    })
    return () => reRun();
  },[]);

  useEffect(()=> {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const favoriteRef = ref(database,"Favorites");
    const reRun = onValue(favoriteRef,(snapshot) => {
      const data = snapshot.val();
      setFavoriteData(data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })):[])
    })
  },[])

  function addToCart() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database, "Cart");
    const sampleItem = {
      id: id,
      catID: catId,
      name: name,
      description: description,
      image: image,
      numberInCart: 1,
      fixedPrice: price,
      ratings: ratings,
      subTitle: subTitle,
      changedPrice: price,
    };
    const newCartRef = push(cartRef);
    set(newCartRef, sampleItem);  
  }

  function deleteFromCart() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const cartRef = ref(database,"Cart");
    onValue(cartRef,(snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === id);
        if (itemKey) {
          const itemRef = ref(database, `Cart/${itemKey}`);
          remove(itemRef).then(() => {
          setCartData(prevCartData => (prevCartData ?? []).filter(item => String(item.id) !== String(id)));
        });
        }
      }
    },{onlyOnce: true});
  }

  function addToFavorites() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const favoriteRef = ref(database,"Favorites");
    const favoritesItems = {
      id: id,
      catID: catId,
      name: name,
      description: description,
      image: image,
      fixedPrice: price,
      ratings: ratings,
      subTitle: subTitle,
    }
    const itemRef = push(favoriteRef);
    set(itemRef,favoritesItems);
  }

  function removeFromFavorites() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const favoiteRef = ref(database,"Favorites");
    onValue(favoiteRef,(snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemKey = Object.keys(data).find(key => data[key].id === id);
        if (itemKey) {
          const itemRef = ref(database,`Favorites/${itemKey}`);
          remove(itemRef).then(() => {
          setFavoriteData(preFavoriteData => (preFavoriteData ?? []).filter(item => String(item.id) !== String(id)));
        });
        }
      }
    },{onlyOnce: true})
  }

  return (
    <View className ='flex-1 px-8 pt-5' style = {{backgroundColor: Colors.primary}}>
        <ScrollView showsVerticalScrollIndicator = {false}>
            <View className='h-[450px] rounded-xl'>
              <Image source={{uri: String(image)}} style={{ width: 400, height: 480, objectFit: 'contain' }} className='mx-auto' />
                <View className='rounded-full h-12 w-12 top-[-460px] p-1'>
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='arrow-back' color={Colors.inactiveTab} size ={28}></Ionicons>
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
                  {favoriteData?.some(item => String(item.id) === String(id)) ? 
                  <TouchableOpacity onPress={()=> removeFromFavorites()}>
                    <Ionicons name='heart' size={40} color ={Colors.tertiary}/>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress = {()=> addToFavorites()}>
                    <Ionicons name='heart' size={40} color ={Colors.inactiveTab}/>
                  </TouchableOpacity>  }
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
          { cartData?.some(item => String(item.id) === String(id)) ?
          <TouchableOpacity className='rounded-xl p-5 w-[80%] ml-[55px]' style ={{backgroundColor: Colors.inactiveTab}} onPress={() => deleteFromCart()}>
            <Text className='text-center text-xl font-bold'>Remove from Cart</Text>
          </TouchableOpacity> : 
          <TouchableOpacity className='bg-[#efe3c8] rounded-xl p-5 w-[80%] ml-[55px]' onPress={()=>  addToCart()}>
            <Text className='text-center text-xl font-bold'>Add to Cart</Text>
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  )
}