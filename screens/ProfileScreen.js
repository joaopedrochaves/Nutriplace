// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      {user && <Text>Welcome, {user.username}</Text>}
      <Button title="View Products" onPress={() => navigation.navigate('Products')} />
    </View>
  );
}
