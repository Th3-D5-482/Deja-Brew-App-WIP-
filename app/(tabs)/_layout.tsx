import { Colors } from '@/components/colors'
import { cartData, favoriteData } from '@/testDatabase'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
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
            tabBarBadge: cartData.length,
            tabBarBadgeStyle: cartData.length ?{
                backgroundColor: Colors.tertiary,
                height: 18,
            } : null
            }} />
        <Tabs.Screen name="favorites" options={{
            title: "Favorites",
            tabBarIcon: ({size,color}) => (
                <Ionicons name ="heart" size={size} color={color} />
            ),
             tabBarBadge: favoriteData.length,
            tabBarBadgeStyle: favoriteData.length ? {
                backgroundColor: Colors.tertiary,
                height: 18,
            } : null
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