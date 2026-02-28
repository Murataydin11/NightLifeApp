import { useFavorites } from '@/src/context/FavoritesContext';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EventDetail() {
  const params = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  const event = {
    id: String(params.id),
    title: String(params.title),
    place: String(params.place),
    date: String(params.date),
    price: String(params.price),
    type: String(params.type),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params.title}</Text>
      <Text style={styles.place}>{params.place}</Text>

      <View style={styles.box}>
        <Text style={styles.line}>📅 Date: {params.date}</Text>
        <Text style={styles.line}>💰 Price: {params.price}</Text>
        <Text style={styles.line}>🎵 Type: {params.type}</Text>
      </View>

      {/* ✅ Favorites button */}
      <Pressable style={styles.favBtn} onPress={() => toggleFavorite(event)}>
        <Text style={styles.favBtnText}>
          {isFavorite(event.id) ? 'Remove Favorite' : 'Add to Favorites'}
        </Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 60 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  place: { color: '#94a3b8', marginTop: 6, fontSize: 16 },
  box: { marginTop: 20, backgroundColor: '#1e293b', padding: 16, borderRadius: 14 },
  line: { color: '#e2e8f0', fontSize: 16, marginBottom: 10 },

  favBtn: {
    marginTop: 18,
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  favBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  btn: { marginTop: 14, backgroundColor: '#22c55e', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
});