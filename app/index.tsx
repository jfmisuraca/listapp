import { Text, View, Button, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const fileUri = `${FileSystem.documentDirectory}data.json`;

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  const loadOrCreateMessages = async () => {
    try {
      // Verifica si el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        // Si no existe, crea el archivo con un array vacío como contenido inicial
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        console.log("Archivo creado");
      }

      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      setMessages(JSON.parse(fileContent)); // Guarda el contenido en el estado de messages
    } catch (error) {
      console.error("Error al leer o crear el archivo:", error);
    }
  };

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

  // Carga los mensajes cuando se monta el componente
  useEffect(() => {
    loadOrCreateMessages();
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

