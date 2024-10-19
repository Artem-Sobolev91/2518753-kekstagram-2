// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и
//  максимальную длину и возвращает true, если строка меньше или равна указанной длине,
//  и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
//  Примеры использования функции:

const checkingStringLength = (line = '', maximumLength = 1) => line.length <= maximumLength;
// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево

const isPalindrome = (line = '') => {
  line = line.replaceAll(' ', '').toLowerCase();
  let reversedLine = '';
  for (let i = line.length - 1; i >= 0; i--) {
    reversedLine += line[i];
  }
  return line === reversedLine;
};
// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN

function extractDigitsToNumber (inputString) {
  const digits = inputString.math(/\d+/g);
  if (digits) {
    return parseInt(digits.join(''),10);
  } else {
    return NaN;
  }
}
