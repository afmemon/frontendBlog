import CryptoJS from "crypto-js";

const key = "12345678990";
export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, key).toString();
  } catch (e) {
    console.log(e);
  }
};

export const decryptData = (data) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (e) {
    console.log(e);
  }
};
