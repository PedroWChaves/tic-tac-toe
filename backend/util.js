const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";

const randomCode = (size) => {
  let code = "";

  while (code.length < 2) {
    code += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }

  while (code.length < size) {
    code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  }
  return code;
};

module.exports = { randomCode };
