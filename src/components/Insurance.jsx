import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { loadData, saveData } from '../utils/storage';

export default function Insurance() {
  const [policyNumber, setPolicyNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const saved = await loadData('insurance');
      if (saved) {
        setPolicyNumber(saved.policyNumber || '');
        setExpiryDate(saved.expiryDate || '');
        setType(saved.type || '');
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    await saveData('insurance', { policyNumber, expiryDate, type });
    Alert.alert('Успех', 'Данные сохранены!');
  };

  const handleDelete = async () => {
    await saveData('insurance', {});
    setPolicyNumber('');
    setExpiryDate('');
    setType('');
    Alert.alert('Удалено', 'Страховка удалена.');
  };

  return (
    <View style={{ padding: 24 }}>
      <Text>Номер полиса</Text>
      <TextInput value={policyNumber} onChangeText={setPolicyNumber} placeholder="Номер полиса" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Дата окончания</Text>
      <TextInput value={expiryDate} onChangeText={setExpiryDate} placeholder="ДД.ММ.ГГГГ" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Вид страхования</Text>
      <TextInput value={type} onChangeText={setType} placeholder="ОСАГО, КАСКО и др." style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Button title="Сохранить" onPress={handleSave} />
      <Button title="Удалить страховку" color="red" onPress={handleDelete} />
    </View>
  );
}