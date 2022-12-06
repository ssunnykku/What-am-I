const USER_TOKEN = 'userToken';
const USER_ID = 'userId';

class Storage {
  static setTokenItem(token: string) {
    sessionStorage.setItem(USER_TOKEN, token);
  }
  static setUserIdItem(userId: string) {
    sessionStorage.setItem(USER_ID, userId);
  }

  static getTokenItem() {
    return sessionStorage.getItem(USER_TOKEN);
  }
  static getUserIdItem() {
    return sessionStorage.getItem(USER_ID);
  }

  static clearItemAll() {
    sessionStorage.clear();
  }
}

Object.freeze(Storage);
export default Storage;
