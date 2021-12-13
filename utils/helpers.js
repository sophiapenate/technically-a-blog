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

function format_capital(name) {
    const lettersArr = name.split('');
    lettersArr[0] = lettersArr[0].toUpperCase();
    return lettersArr.join('');
}

module.exports = { format_date, format_plural, format_capital }