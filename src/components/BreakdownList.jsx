import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { loadData, saveData } from '../utils/storage';

export default function BreakdownList({ navigation }) {
  const [breakdowns, setBreakdowns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loaded = await loadData('breakdowns');
      setBreakdowns(loaded || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const loaded = await loadData('breakdowns');
      setBreakdowns(loaded || []);
    });
    return unsubscribe;
  }, [navigation]);

  const deleteItem = async (idx) => {
    const updated = breakdowns.filter((_, i) => i !== idx);
    setBreakdowns(updated);
    await saveData('breakdowns', updated);
  };

  const markFixed = async (idx) => {
    const updated = breakdowns.map((item, i) =>
      i === idx ? { ...item, status: 'Исправлено' } : item
    );
    setBreakdowns(updated);
    await saveData('breakdowns', updated);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Добавить поломку" onPress={() => navigation.navigate('Добавить поломку')} />
{/*       <Button title="Перейти к работам" onPress={() => navigation.navigate('Работы')} /> */}
      <Button title="Перейти к страховке" onPress={() => navigation.navigate('Страховка')} />
      <FlatList
        data={breakdowns}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            padding: 8,
            marginVertical: 4,
            borderWidth: 1,
            borderColor: '#ddd',
            backgroundColor: item.status === 'Исправлено' ? '#c5f7c1' : '#fff'
          }}>
            <Text>Дата: {item.date}</Text>
            <Text>Время: {item.time}</Text>
            <Text>Пробег: {item.mileage}</Text>
            <Text>Описание: {item.description}</Text>
            <Text>Статус: {item.status}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              {item.status !== 'Исправлено' && (
                <TouchableOpacity onPress={() => markFixed(index)} style={{ marginRight: 16 }}>
                  <Text style={{ color: 'green' }}>Исправлено</Text>
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