import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { loadData, saveData } from '../utils/storage';

export default function AddMaintenance({ navigation, route }) {
  const [date, setDate] = useState('');
  const [mileage, setMileage] = useState('');
  const [work, setWork] = useState(route.params?.workName || '');
  const [cost, setCost] = useState('');
  const [comment, setComment] = useState('');
  const [photoUri, setPhotoUri] = useState('');

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Ошибка', response.errorMessage || 'Ошибка выбора изображения');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri);
        }
      }
    );
  };

  const selectWork = () => {
    navigation.navigate('SelectWorkFromReference', { onSelect: (item) => setWork(item.name) });
  };

  const handleSave = async () => {
    if (!date || !mileage || !work) {
      Alert.alert('Ошибка', 'Заполните все обязательные поля');
      return;
    }
    const newItem = { date, mileage, work, cost, comment, completed: false, photoUri };
    const saved = await loadData('maintenances');
    const updated = saved ? [...saved, newItem] : [newItem];
    await saveData('maintenances', updated);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 24 }}>
      <Text>Дата*</Text>
      <TextInput value={date} onChangeText={setDate} placeholder="ДД.ММ.ГГГГ" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Пробег*</Text>
      <TextInput value={mileage} onChangeText={setMileage} placeholder="Пробег" keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Название работы*</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput value={work} onChangeText={setWork} placeholder="Название" style={{ borderBottomWidth: 1, flex: 1 }} />
        <Button title="Справочник" onPress={selectWork} />
      </View>
      <Text>Стоимость</Text>
      <TextInput value={cost} onChangeText={setCost} placeholder="Стоимость" keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <Text>Комментарий</Text>
      <TextInput value={comment} onChangeText={setComment} placeholder="Комментарий" multiline style={{ borderBottomWidth: 1, marginBottom: 8 }} />
      <TouchableOpacity onPress={pickImage}>
        <Text style={{ color: '#3366ff', marginBottom: 8 }}>Добавить фото</Text>
      </TouchableOpacity>
      {photoUri ? <Image source={{ uri: photoUri }} style={{ width: 100, height: 100, marginBottom: 8 }} /> : null}
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
}