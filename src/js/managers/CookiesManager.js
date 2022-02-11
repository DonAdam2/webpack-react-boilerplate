//constants
import { decryptData, encryptData } from '../constants/Helpers';

class CookiesManager {
  //used to:
  // - set new cookie => setCookie('name;, 'value', 10);
  // - remove cookie => setCookie('name', '', -10);
  static setCookie(cname, cvalue, exdays) {
    const encryptedValue = encryptData(cvalue),
      d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + encryptedValue + ';' + expires + ';path=/';
  }
  static getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const value = c.substring(name.length, c.length);
        return decryptData(value);
      }
    }
    return '';
  }
}

export default CookiesManager;
