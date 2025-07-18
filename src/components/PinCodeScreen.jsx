import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function PinCodeScreen({ navigation }) {
  const [pin, setPin] = useState('');

  const checkPin = async () => {
    const savedPin = await SecureStore.getItemAsync('user_pin');
    if (savedPin === pin) {
      navigation.replace('Home');
    } else {
      Alert.alert('Ошибка', 'Неверный пин-код');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Введите PIN-код:</Text>
      <TextInput value={pin} onChangeText={setPin} secureTextEntry keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 16 }} />
      <Button title="Войти" onPress={checkPin} />
    </View>
  );
}