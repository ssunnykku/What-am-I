const USER_TOKEN = 'userToken';
const USER_ID = 'userId';
const NICKNAME = 'nickname';

class Storage {
  static setTokenItem(token: string) {
    sessionStorage.setItem(USER_TOKEN, token);
  }
  static setUserIdItem(userId: string) {
    sessionStorage.setItem(USER_ID, userId);
  }
  static setNicknameItem(nickname: string) {
    sessionStorage.setItem(NICKNAME, nickname);
  }

  static getTokenItem() {
    return sessionStorage.getItem(USER_TOKEN);
  }
  static getUserIdItem() {
    return sessionStorage.getItem(USER_ID);
  }
  static getNicknameItem() {
    return sessionStorage.getItem(NICKNAME);
  }

  static clearItemAll() {
    sessionStorage.clear();
  }
}

Object.freeze(Storage);
export default Storage;
