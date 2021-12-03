export class LocalStorage {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
