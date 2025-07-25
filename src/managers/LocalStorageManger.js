//constants
import { decryptData, encryptData } from '@/constants/Helpers';
import SharedManager, { AvailableStorages } from './SharedManager';

class LocalStorageManager {
  static setItem(key, data) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const encryptedValue = encryptData(data);
      localStorage.setItem(key, encryptedValue);
    }
  }
  static getItem(key) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const value = localStorage.getItem(key);
      try {
        return decryptData(value);
      } catch (e) {
        console.error(`Error decrypting data for key "${key}":`, e);
        return value;
      }
    }
    return undefined;
  }
  static removeItem(key) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const value = this.getItem(key);
      localStorage.removeItem(key);
      return value;
    }
    return undefined;
  }
  static clear() {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      localStorage.clear();
    }
  }
}

export default LocalStorageManager;
