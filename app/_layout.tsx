import '@/global.css';
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
return (
  <SafeAreaProvider>
    <View className="flex-1 bg-green-500">
      <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </View>
  </SafeAreaProvider>
);
}
