const DNA_TOKEN = 'DNA_ACCESS_TOKEN';

class Storage {
  static setTokenItem(token: string) {
    sessionStorage.setItem(DNA_TOKEN, token);
  }

  static getTokenItem() {
    return sessionStorage.getItem(DNA_TOKEN);
  }

  static clearToeknItemAll() {
    sessionStorage.clear();
  }
}

Object.freeze(Storage);
export default Storage;
