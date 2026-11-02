/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

function repeater(str, options = {}) {
  const {
    repeatTimes = 1,
    separator = '+',
    addition,
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options;

  // Если addition не передан, используем пустую строку (но не добавляем её)
  const addStr = addition !== undefined ? String(addition) : '';
  
  // Если addition есть, собираем его
  let addPart = '';
  if (addition !== undefined) {
    addPart = Array(Math.max(1, additionRepeatTimes || 1)).fill(addStr).join(additionSeparator);
  }

  const mainStr = String(str) + addPart;

  const times = Math.max(1, repeatTimes || 1);
  return Array(times).fill(mainStr).join(separator);
}

module.exports = {
  repeater
};