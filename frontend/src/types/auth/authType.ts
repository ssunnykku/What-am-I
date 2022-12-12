export interface AuthCommonType {
  email: string;
  password: string;
}

export interface AuthRegisterType extends AuthCommonType {
  nickname: string;
  checkPassword: string;
}

export interface UserInfoType {
  email: string;
  nickname: string;
  profileImg: string;
  userId: string;
}
