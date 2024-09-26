export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  gender: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  suspendedAt?: Date;
}
