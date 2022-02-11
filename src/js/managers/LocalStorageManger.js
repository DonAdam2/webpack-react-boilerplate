//constants
import { decryptData, encryptData } from '../constants/Helpers';

class LocalStorageManager {
  static setItem(key, data) {
    const encryptedValue = encryptData(data);
    localStorage.setItem(key, encryptedValue);
  }
  static getItem(key) {
    const value = localStorage.getItem(key);
    try {
      return decryptData(value);
    } catch (e) {
      return value;
    }
  }
  static removeItem(key) {
    const value = this.getItem(key);
    localStorage.removeItem(key);
    return value;
  }
  static clear() {
    localStorage.clear();
  }
}

export default LocalStorageManager;
