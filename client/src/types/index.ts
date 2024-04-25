
export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  isAdministrator: string;
}
