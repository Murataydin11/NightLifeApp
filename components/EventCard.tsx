import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function EventCard({ event }: any) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/(tabs)/EventDetail',
          params: event,
        })
      }
      style={styles.card}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.place}>{event.place}</Text>
      <Text style={styles.details}>
        {event.date} • {event.price}
      </Text>
      <Text style={styles.type}>{event.type}</Text>
    </Pressable>
  );
}

export default React.memo(EventCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  place: { color: '#94a3b8', marginTop: 4 },
  details: { color: '#cbd5f5', marginTop: 6 },
  type: { marginTop: 8, color: '#22c55e', fontWeight: '600' },
});