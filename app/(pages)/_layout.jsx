import {Stack} from "expo-router";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {View} from "react-native";

export default function AppLayout() {
  return (<GestureHandlerRootView>
        <View className="h-full w-full">
          <Stack
              screenOptions={{
                headerShown: false,
              }}>
          </Stack>
        </View>
  </GestureHandlerRootView>)
}

