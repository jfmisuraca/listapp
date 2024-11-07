import { Text, View } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { material } from "react-native-typography";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={material.headline}>Hola mundo!</Text>
    </View>
  );
}
