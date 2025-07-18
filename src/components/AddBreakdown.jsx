import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { loadData, saveData } from '../utils/storage';

export default function AddBreakdown({ navigation }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mileage, setMileage] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Открыто');

  const handleSave = async () => {
    if (!date || !description) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните обязательные поля (дата, описание)');
      return;
    }
    const newItem = { date, time, mileage, description, status };
    const saved = await loadData('breakdowns');
    const updated = saved ? [...saved, newItem] : [newItem];
    await saveData('breakdowns', updated);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 24 }}>
      <Text>Дата*</Text>
      <TextInput value={date} onChangeText={setDate} placeholder="ДД.ММ.ГГГГ" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Время</Text>
      <TextInput value={time} onChangeText={setTime} placeholder="ЧЧ:ММ" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Пробег</Text>
      <TextInput value={mileage} onChangeText={setMileage} placeholder="Пробег" keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Описание поломки*</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Описание" multiline style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
}