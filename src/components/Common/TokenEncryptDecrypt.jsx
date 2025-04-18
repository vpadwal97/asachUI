import CryptoJS from 'crypto-js';


const secretKey = "9ez/uqcQLFEeIG2KQy8pelosVDUB175poEoqpHh4YIg=";
export const TokenEncrypt = (token)=>{
    const key = CryptoJS.enc.Base64.parse(secretKey);
    const encryptedData = CryptoJS.AES.encrypt(token, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
      return encryptedData
}

export const TokenDecrypt = (token) =>{
    const key = CryptoJS.enc.Base64.parse(secretKey);
    const decryptedData = CryptoJS.AES.decrypt(token, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
      return decryptedData;
}