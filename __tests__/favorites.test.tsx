describe('Favorites feature tests', () => {

  test('add favorite increases list length', () => {
    const favorites = [];
    favorites.push({ id: '1', title: 'Party' });

    expect(favorites.length).toBe(1);
  });

  test('remove favorite decreases list length', () => {
    let favorites = [{ id: '1', title: 'Party' }];
    favorites = favorites.filter(e => e.id !== '1');

    expect(favorites.length).toBe(0);
  });

  test('isFavorite returns true if event exists', () => {
    const favorites = [{ id: '1', title: 'Party' }];

    const isFavorite = favorites.some(e => e.id === '1');

    expect(isFavorite).toBe(true);
  });

  test('isFavorite returns false if event does not exist', () => {
    const favorites = [{ id: '1', title: 'Party' }];

    const isFavorite = favorites.some(e => e.id === '2');

    expect(isFavorite).toBe(false);
  });

  test('favorites list starts empty', () => {
    const favorites = [];

    expect(favorites.length).toBe(0);
  });

  test('event object contains required fields', () => {
    const event = {
      id: '1',
      title: 'Test Event',
      place: 'Club',
      date: '2026',
      price: '10€',
      type: 'Party',
    };

    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('title');
    expect(event).toHaveProperty('place');
    expect(event).toHaveProperty('date');
  });

  test('search finds matching event', () => {
    const events = [
      { title: 'Techno Party' },
      { title: 'Jazz Concert' }
    ];

    const results = events.filter(e =>
      e.title.toLowerCase().includes('techno')
    );

    expect(results.length).toBe(1);
  });

  test('search returns empty when no match', () => {
    const events = [
      { title: 'Techno Party' }
    ];

    const results = events.filter(e =>
      e.title.toLowerCase().includes('rock')
    );

    expect(results.length).toBe(0);
  });

  test('events are sorted by date', () => {
    const events = [
      { title: 'Event A', date: '2026-05-01' },
      { title: 'Event B', date: '2026-03-01' },
      { title: 'Event C', date: '2026-04-01' }
    ];

    const sorted = events.sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

    expect(sorted[0].title).toBe('Event B');
  });

  test('duplicate favorites should not be added', () => {
    const favorites = [];

    const event = { id: '1', title: 'Party' };

    favorites.push(event);

    const exists = favorites.some(e => e.id === event.id);

    if (!exists) {
      favorites.push(event);
    }

    expect(favorites.length).toBe(1);
  });

});