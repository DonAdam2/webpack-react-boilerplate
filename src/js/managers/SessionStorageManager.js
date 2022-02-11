//constants
import { decryptData, encryptData } from '../constants/Helpers';

class SessionStorageManager {
  static setItem(key, data) {
    const encryptedValue = encryptData(data);
    sessionStorage.setItem(key, JSON.stringify(encryptedValue));
  }
  static getItem(key) {
    const value = sessionStorage.getItem(key);
    try {
      return decryptData(value);
    } catch (e) {
      return value;
    }
  }
  static removeItem(key) {
    const value = this.getItem(key);
    sessionStorage.removeItem(key);
    return value;
  }
  static clear() {
    sessionStorage.clear();
  }
}

export default SessionStorageManager;
