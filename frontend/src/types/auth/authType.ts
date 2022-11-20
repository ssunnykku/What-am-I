export interface AuthCommonType {
  email: string;
  password: string;
}

export interface AuthRegisterType extends AuthCommonType {
  username: string;
  confirmPassword: string;
}
