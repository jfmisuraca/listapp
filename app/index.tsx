import { Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { material } from "react-native-typography";
import styles from '../components/styles';

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
      style={styles.container}>
      <Text style={material.headline}>Soy el index (listas)</Text>
      <Button title="Botón" onPress={() => alert('auch')} />
    </View>
  );
}
