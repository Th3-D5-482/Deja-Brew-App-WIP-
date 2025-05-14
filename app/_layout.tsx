import { Colors } from '@/components/colors';
import '@/global.css';
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
return (
  <SafeAreaProvider>
    <View className="flex-1" style ={{backgroundColor: Colors.primary}}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </View>
  </SafeAreaProvider>
);
}
