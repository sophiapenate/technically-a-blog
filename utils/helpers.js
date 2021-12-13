module.exports = {
  format_date: (date) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleString("en-US", options);
  },
  format_plural: (word, count) => {
    if (count !== 1) {
      return `${word}s`;
    }
    return word;
  },
  format_capital: (name) => {
    const lettersArr = name.split("");
    lettersArr[0] = lettersArr[0].toUpperCase();
    return lettersArr.join("");
  },
  current_year: () => {
    return new Date().getFullYear();
  },
};
