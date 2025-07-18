import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { loadData } from '../utils/storage';
import toReferenceData from '../utils/toReferenceData.json';

function getUpcomingWorks(maintenances, currentMileage) {
  // Пример: для каждой работы из справочника смотрим, когда была последний раз выполнена
  // и считаем, когда надо сделать снова
  return toReferenceData.map(ref => {
    const last = maintenances
      .filter(m => m.work === ref.name)
      .sort((a, b) => (b.mileage - a.mileage))[0];
    const nextMileage = last ? Number(last.mileage) + ref.interval_km : ref.interval_km;
    return {
      ...ref,
      nextMileage,
      dueIn: nextMileage - currentMileage,
    };
  }).filter(item => item.dueIn <= 1000); // показывать только если осталось <1000 км
}

export default function UpcomingWorks() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const maintenances = await loadData('maintenances') || [];
      const currentMileage = maintenances.length ? Math.max(...maintenances.map(x => Number(x.mileage))) : 0;
      setUpcoming(getUpcomingWorks(maintenances, currentMileage));
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Ближайшие работы</Text>
      <FlatList
        data={upcoming}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>{item.name}: через {item.dueIn} км</Text>
          </View>
        )}
      />
    </View>
  );
}