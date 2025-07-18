import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { loadData, saveData } from '../utils/storage';

export default function MaintenanceList({ navigation }) {
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loaded = await loadData('maintenances');
      setMaintenances(loaded || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const loaded = await loadData('maintenances');
      setMaintenances(loaded || []);
    });
    return unsubscribe;
  }, [navigation]);

  const deleteItem = async (idx) => {
    const updated = maintenances.filter((_, i) => i !== idx);
    setMaintenances(updated);
    await saveData('maintenances', updated);
  };

  const markCompleted = async (idx) => {
    const updated = maintenances.map((item, i) =>
      i === idx ? { ...item, completed: true } : item
    );
    setMaintenances(updated);
    await saveData('maintenances', updated);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Добавить работу" onPress={() => navigation.navigate('Добавить работу')} />
      <Button title="Перейти к поломкам" onPress={() => navigation.navigate('Поломки')} />
      <Button title="Перейти к страховке" onPress={() => navigation.navigate('Страховка')} />
      <FlatList
        data={maintenances}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            padding: 8,
            marginVertical: 4,
            borderWidth: 1,
            borderColor: '#ddd',
            backgroundColor: item.completed ? '#c5f7c1' : '#fff'
          }}>
            <Text>Дата: {item.date}</Text>
            <Text>Работа: {item.work}</Text>
            <Text>Пробег: {item.mileage}</Text>
            <Text>Стоимость: {item.cost}</Text>
            <Text>Комментарий: {item.comment}</Text>
            <Text>Статус: {item.completed ? 'Выполнено' : 'Ожидает'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {!item.completed && (
                <TouchableOpacity onPress={() => markCompleted(index)} style={{ marginRight: 16 }}>
                  <Text style={{ color: 'green' }}>Выполнить</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Text style={{ color: 'red' }}>Удалить</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}