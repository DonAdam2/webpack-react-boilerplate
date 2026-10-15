import { AES, Utf8 } from 'crypto-es';

import LocalStorageManager from '@/managers/LocalStorageManger';

import { LocalStorageKeys } from './Constants';

const secretKey = 'we are the best of the best';

export const updateObject = (oldObject, UpdatedValues) => ({
  ...oldObject,
  ...UpdatedValues,
});

export const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));

export const encryptData = (data) => {
  return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (data) => {
  const bytes = AES.decrypt(data, secretKey);
  return JSON.parse(Utf8.stringify(bytes));
};

export const isAuthenticated = () => LocalStorageManager.getItem(LocalStorageKeys.TOKEN);
