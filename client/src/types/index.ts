export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
}

export interface ProfileType {
  name: string;
  email: string;
  profilePicture: string;
}

export interface ShortenUrlData {
  originalUrl: string;
  expirationDate: Date;
  hasExpirationDate: boolean;
  shortUrl: string;
  autoShorten: boolean;
  hasPassword: boolean;
  password: string;
}

export interface UrlData {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  hasExpirationDate: boolean;
  expirationDate: Date;
  createdAt: string;
  clickCount: number;
  password?: string;
}

export interface EditUrlData extends UrlData {
  hasPassword: boolean;
}

export interface EditUrlProps {
  _id: string;
  urlData: UrlData;
  editUrl: boolean;
  setEditUrl: React.Dispatch<React.SetStateAction<boolean>>;
  loadDashboard: (showMessage?: boolean) => Promise<void>;
}

export interface ShortenUrlType {
  originalUrl: string;
  expirationDate: Date;
  hasExpirationDate: boolean;
  shortUrl: string;
  autoShorten: boolean;
  hasPassword: boolean;
  password: string;
}
