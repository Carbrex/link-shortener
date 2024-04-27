export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
}

export interface ShortenUrlData {
  originalUrl: string;
  expirationDate: Date;
  hasExpirationDate: Boolean;
  shortUrl: string;
  autoShorten: Boolean;
  hasPassword: Boolean;
  password: string;
}

export interface UrlData {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  hasExpirationDate: Boolean;
  expirationDate: Date;
  createdAt: string;
  clickCount: number;
  password?: string;
};

export interface EditUrlData extends UrlData {
  hasPassword: Boolean;
}

export interface EditUrlProps {
  _id: string;
  urlData: UrlData;
  editUrl: Boolean;
  setEditUrl: React.Dispatch<React.SetStateAction<Boolean>>;
  loadDashboard: (showMessage?:Boolean) => Promise<void>;
}


interface User {
  name: string;
  email: string;
  isAdministrator: string;
}