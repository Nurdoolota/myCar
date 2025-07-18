import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import toReferenceData from '../utils/toReferenceData.json';

export default function SelectWorkFromReference({ onSelect, navigation }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Справочник работ</Text>
      <FlatList
        data={toReferenceData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { onSelect(item); navigation.goBack(); }}>
            <Text style={{ fontSize: 16, padding: 8 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}