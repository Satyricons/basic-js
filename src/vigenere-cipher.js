/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  // ИСПРАВЛЕНО: добавлено подчёркивание, как в вызовах ниже
  _process(text, key, decrypt = false) {
    if (text === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const upperText = text.toUpperCase();
    const upperKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    let keyIndex = 0;
    let result = '';

    for (const ch of upperText) {
      const idx = alphabet.indexOf(ch);
      if (idx === -1) {
        result += ch;
        continue;
      }
      const shift = alphabet.indexOf(upperKey[keyIndex % upperKey.length]);
      const newIdx = decrypt
        ? (idx - shift + 26) % 26
        : (idx + shift) % 26;
      result += alphabet[newIdx];
      keyIndex++;
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  encrypt(message, key) {
    return this._process(message, key, false);
  }

  decrypt(encryptedMessage, key) {
    return this._process(encryptedMessage, key, true);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};