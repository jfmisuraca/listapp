import { Text, View, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { material } from "react-native-typography";
import styles from '../components/styles';
import { Item } from "jstodotxt";
import * as FileSystem from 'expo-file-system';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const fileUri = `${FileSystem.documentDirectory}data.json`;

  const handleAddText = async () => {
    if (inputText.trim() === '') return;
    const newMessages = [...messages, inputText];

    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(newMessages));
      setMessages(newMessages);
      setInputText('');
    } catch (error) {
      console.error('error al escribir en el archivo', error);
    }
  };
  const loadMessages = async () => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      setMessages(JSON.parse(fileContent));
    } catch (error) {
      console.error('Error al leer el archivo:', error);
    }
  };

  // Carga los mensajes cuando se monta el componente
  React.useEffect(() => {
    loadMessages();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Escribe algo..."
        value={inputText}
        onChangeText={setInputText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Agregar" onPress={handleAddText} />
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Mensajes:</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </View>
  );
};


/* const item = new Item('este es un item de prueba @home')
 return (
   <View
     style={styles.container}>
     <Text style={material.headline}>Soy el index (listas)</Text>
     <TextInput></TextInput>
     <Button title="clg" onPress={() => console.log(item.contexts())} />
   </View>
 );
} */