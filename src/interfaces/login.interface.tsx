export interface login {
  uuid_user: string;
  name: string;
  email: string;
  role?: role | undefined;
  iat: number;
  exp: number;
}

interface role {
    uuid_role: string;
    name: string;
}