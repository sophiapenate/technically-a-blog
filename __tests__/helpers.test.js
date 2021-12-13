const { format_date, format_plural } = require('../utils/helpers');

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