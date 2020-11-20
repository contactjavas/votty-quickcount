export interface User {
  ID: number;
  user_login: string;
  user_email: string;
  first_name: string;
  last_name: string;
  roles: Array<string>;
  kabupaten: Kabupaten;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Kabupaten {
  id: number;
  name: string;
}

export interface Kecamatan {
  id: number;
  name: string;
}