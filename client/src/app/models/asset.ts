import { AssetHistoryItem } from './assetHistoryItem';

export interface Asset {
  name: string;
  description: string;
  price: number;
  categoryUid: string; // This is a foreign key
  payday: Date;
  assetHistory: AssetHistoryItem[];
  createdAt: Date;
  updatedAt: Date;
  uid?: string; // This is the primary key
  dividend?: number;
}
