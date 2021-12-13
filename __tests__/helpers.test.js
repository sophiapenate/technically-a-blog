const { format_date, format_plural, format_capital } = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2021-12-13 11:17:07');

    expect(format_date(date)).toBe('Dec 13, 2021');
});

test('format_pural() returns properly pluralized word', () => {
    expect(format_plural("post", 1)).toBe("post");
    expect(format_plural("post", 2)).toBe("posts");
    expect(format_plural("user", 1)).toBe("user");
    expect(format_plural("user", 954)).toBe("users");
});

test('format_capital() returns name with capitalized first letter', () => {
    expect(format_capital("sophia")).toBe("Sophia");
    expect(format_capital("gabriel", 2)).toBe("Gabriel");
    expect(format_capital("Sophie", 1)).toBe("Sophie");
    expect(format_capital("GABE", 2)).toBe("GABE");
});