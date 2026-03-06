import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type EventItem = {
  id: string;
  title: string;
  place: string;
  date: string;
  price: string;
  type: string;
};

type FavoritesContextType = {
  favorites: EventItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (event: EventItem) => void;
  loading: boolean;
  error: string | null;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FAVORITES_STORAGE_KEY = 'nightlifeapp_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setError(null);
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (err) {
        console.log('Failed to load favorites:', err);
        setError('Could not load favorites.');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        setError(null);
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );
      } catch (err) {
        console.log('Failed to save favorites:', err);
        setError('Could not save favorites.');
      }
    };

    if (!loading) {
      saveFavorites();
    }
  }, [favorites, loading]);

  const isFavorite = (id: string) => favorites.some((e) => e.id === id);

  const toggleFavorite = (event: EventItem) => {
    setFavorites((prev) => {
      const exists = prev.some((e) => e.id === event.id);

      if (exists) {
        return prev.filter((e) => e.id !== event.id);
      }

      return [...prev, event];
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      loading,
      error,
    }),
    [favorites, loading, error]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
}