export interface Category {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  uid?: string; // This is the primary key
}
