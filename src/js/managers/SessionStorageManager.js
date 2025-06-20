//constants
import { decryptData, encryptData } from '../constants/Helpers';
//managers
import SharedManager, { AvailableStorages } from '@/js/managers/SharedManager';

class SessionStorageManager {
  static setItem(key, data) {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const encryptedValue = encryptData(data);
      sessionStorage.setItem(key, JSON.stringify(encryptedValue));
    }
  }
  static getItem(key) {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const value = sessionStorage.getItem(key);
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
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const value = this.getItem(key);
      sessionStorage.removeItem(key);
      return value;
    }
    return undefined;
  }
  static clear() {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      sessionStorage.clear();
    }
  }
}

export default SessionStorageManager;
