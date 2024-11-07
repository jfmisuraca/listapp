import React from 'react'
import DetalleTarea from '../components/DetalleTarea'
import { Text, View } from 'react-native'
import styles from '../components/styles';

export default function tarea() {
  return (
    <View style={styles.container}>
      <Text><DetalleTarea /></Text>
    </View>

  )
};
