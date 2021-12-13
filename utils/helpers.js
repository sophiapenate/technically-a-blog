function format_date(date) {
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }
    return new Date(date).toLocaleString('en-US', options);
};

function format_plural(word, count) {
    if (count !== 1) {
        return `${word}s`;
    }
    return word;
};

module.exports = { format_date, format_plural }