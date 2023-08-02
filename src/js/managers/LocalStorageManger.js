//constants
import { decryptData, encryptData } from '../constants/Helpers';

class LocalStorageManager {
  static setItem(key, data) {
    if (this.isStorageAvailable()) {
      const encryptedValue = encryptData(data);
      localStorage.setItem(key, encryptedValue);
    }
  }
  static getItem(key) {
    if (this.isStorageAvailable()) {
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
    if (this.isStorageAvailable()) {
      const value = this.getItem(key);
      localStorage.removeItem(key);
      return value;
    }
    return undefined;
  }
  static clear() {
    if (this.isStorageAvailable()) {
      localStorage.clear();
    }
  }
  //used to solve the following issue
  //SecurityError: The operation is insecure.
  static isStorageAvailable() {
    let storage;
    try {
      storage = window.localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
}

export default LocalStorageManager;
