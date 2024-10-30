export interface User {
  name: string;
  cpf: string;
  email: string;
  birthdate: Date;
  city: string;
  state: string;
  country: string;
  role: string;
  isEnable: boolean;
  createdAt: Date;
  updatedAt: Date;
  uid?: string;
}
