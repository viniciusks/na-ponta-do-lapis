import { MyDropdownItem } from './myDropdownItem';

export interface User {
  name: string;
  cpf: string;
  email: string;
  birthdate: Date;
  city: MyDropdownItem;
  state: MyDropdownItem;
  country: MyDropdownItem;
  role: string;
  isEnable: boolean;
  createdAt: Date;
  updatedAt: Date;
  uid?: string;
}
