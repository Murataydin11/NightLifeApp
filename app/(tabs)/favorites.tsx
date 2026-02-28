import EventCard from '@/components/EventCard';
import { useFavorites } from '@/src/context/FavoritesContext';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet ⭐</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  empty: { color: '#94a3b8', marginTop: 40, textAlign: 'center', fontSize: 16 },
});