import events from '@/src/data/events';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EVENTS_STORAGE_KEY = 'nightlifeapp_events_cache';

export const getEvents = async () => {
  try {
    const cachedEvents = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);

    if (cachedEvents) {
      return JSON.parse(cachedEvents);
    }

    const fetchedEvents = await new Promise<typeof events>((resolve) => {
      setTimeout(() => {
        resolve(events);
      }, 1000);
    });

    await AsyncStorage.setItem(
      EVENTS_STORAGE_KEY,
      JSON.stringify(fetchedEvents)
    );

    return fetchedEvents;
  } catch (error) {
    console.log('Failed to get events:', error);

    const fallbackEvents = await AsyncStorage.getItem(EVENTS_STORAGE_KEY);

    if (fallbackEvents) {
      return JSON.parse(fallbackEvents);
    }

    throw new Error('Failed to load events.');
  }
};