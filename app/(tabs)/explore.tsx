import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import EventCard from '@/components/EventCard';
import events from '@/src/data/events';

export default function ExploreScreen() {
  const [search, setSearch] = useState('');

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return events;

    return events.filter((event) =>
      String(event.title).toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search events..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  input: {
    backgroundColor: '#1e293b',
    margin: 15,
    padding: 12,
    borderRadius: 10,
    color: 'white',
  },
});