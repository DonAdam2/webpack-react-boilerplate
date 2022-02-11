import CryptoJS from 'crypto-js';

const secretKey = 'we are the best of the best';

export const updateObject = (oldObject, UpdatedValues) => ({
  ...oldObject,
  ...UpdatedValues,
});

export const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
