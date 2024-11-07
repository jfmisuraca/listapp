import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list-alt" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen
        name="tarea"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="font-awesome" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
