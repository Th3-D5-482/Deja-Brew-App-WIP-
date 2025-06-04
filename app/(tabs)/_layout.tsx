import { Colors } from '@/components/colors';
import { firebaseConfig } from '@/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';

interface cartList {
  id: string;
}
export default function _layout() {
    const [cartData,setCartData] = useState<cartList[]>();
    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const cartRef = ref(database,"Cart");
        const reRun = onValue(cartRef,(snapshot) => {
            const data = snapshot.val();
            setCartData(data ? Object.keys(data).map(key => ({
                id: key,
                ...data[key],
            })): []);
        })
        return () => reRun();
    },[]);
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: Colors.secondary,
            paddingTop: 5,
            borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.activeTab,
        tabBarInactiveTintColor: Colors.inactiveTab,
        }}>
        <Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({size,color}) => (
                <Ionicons name ="home" size={size} color={color} />
            ),
            }} />
        <Tabs.Screen name="cart" options={{
            title: "Cart",
            tabBarIcon: ({size,color}) => (
                <Ionicons name ="cart" size={size} color={color} />
            ),
            tabBarBadge: (cartData?.length ?? 0) > 0 ? cartData!.length : undefined,
            tabBarBadgeStyle:{
                backgroundColor: Colors.tertiary,
                height: 18,
            }
            }} />
        <Tabs.Screen name="favorites" options={{
            title: "Favorites",
            tabBarIcon: ({size,color}) => (
                <Ionicons name ="heart" size={size} color={color} />
            ),
            tabBarBadge:undefined,
            tabBarBadgeStyle: {
                backgroundColor: Colors.tertiary,
                height: 18,
            }
            }} />
        <Tabs.Screen name="profile" options={{
            title: "Profile",
            tabBarIcon: ({size,color}) => (
                <Ionicons name ="person" size={size} color={color} />
            ),
            }} />
            
    </Tabs>
  )
}