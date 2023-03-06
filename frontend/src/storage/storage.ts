const USER_TOKEN = 'userToken';
const USER_ID = 'userId';
const NICKNAME = 'nickname';
const REFRESH_TOKEN = 'refreshToken';

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
  static setRefreshTokenItem(refreshToken: string) {
    sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
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
  static getRefreshTokenItem() {
    return sessionStorage.getItem(REFRESH_TOKEN);
  }

  static clearItemAll() {
    sessionStorage.clear();
  }
}

Object.freeze(Storage);
export default Storage;
