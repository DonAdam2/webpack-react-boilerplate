//constants
import { decryptData, encryptData } from '../constants/Helpers';
import SharedManager, { AvailableStorages } from '@/js/managers/SharedManager';

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
