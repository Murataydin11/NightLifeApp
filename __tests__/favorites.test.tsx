describe("Event data tests", () => {

  const event = {
    id: "1",
    title: "Test Event",
    place: "Club",
    date: "2026",
    price: "10€",
    type: "Party"
  };

  test("event should have id", () => {
    expect(event).toHaveProperty("id");
  });

  test("event should have title", () => {
    expect(event).toHaveProperty("title");
  });

  test("event title should not be empty", () => {
    expect(event.title.length).toBeGreaterThan(0);
  });

  test("event id should be a string", () => {
    expect(typeof event.id).toBe("string");
  });

});