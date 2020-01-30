const crypto = require('crypto')

// const encrypted = securityHelper.encrypt('testing', '1234567890abcdefghijklmnopqrstuv')
// console.log('encrypted:', encrypted)
// const decrypted = securityHelper.decrypt('1234567890abcdefghijklmnopqrstuv', encrypted, true)
// console.log('decrypted:', decrypted)

/*
*   Client Logic for Encryption-Decryption
*/

const algorithm = 'aes-256-ctr'

/*
    Chat UI uses below way to encrypt.
    Masterbot passes the hash to the canvas during handshake/chatInit API.
*/

function _encrypt (input, hash) {
  try {
    if (input === undefined || input.length === 0) {
      return input
    }

    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(algorithm, hash, iv)
    let encrypted = cipher.update(input, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return [iv.toString('hex'), encrypted].join(':')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error encrypt', error)
    return input
  }
}

/*
    Chat UI uses below way to decrypt.
    "isFromMe"" is a boolean flag indicates if the message is from the user or from bot,
    it only affects error handling
*/

function _decrypt (input, hash, isFromMe) {
  try {
    if (input === undefined || input.length === 0) {
      return isFromMe ? input : 'An error has occurred. Please try again later.'
    }

    const arr = input.split(':')

    if (arr.length !== 2) {
      return isFromMe ? input : 'An error has occurred. Please try again later.'
    }

    const ivString = arr[0]
    const iv = Buffer.from(ivString, 'hex')
    const text = arr[1]
    const decipher = crypto.createDecipheriv(algorithm, hash, iv)
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    return isFromMe ? input : 'An error has occurred. Please try again later.'
  }
}

// 決定要不要讓用戶端套用加解密機制就看這裡
// 有 hash 直表示用戶端需要 加解密
// 無 hash 直表示用戶端不需 加解密
module.exports.getHashValue = () => {
  const isApplyEncrypt = true
  return isApplyEncrypt ? '1234567890abcdefghijklmnopqrstuv' : ''
}

module.exports.encrypt = (input) => {
  const hash = this.getHashValue()
  return hash ? _encrypt(input, hash) : input
}

module.exports.decrypt = (input) => {
  const hash = this.getHashValue()
  return hash ? _decrypt(input, hash, false) : input
}
