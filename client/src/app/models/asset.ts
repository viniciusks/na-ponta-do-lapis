import { AssetHistoryItem } from './assetHistoryItem';
import { Category } from './category';

export interface Asset {
  name: string;
  description: string;
  price: number;
  category: Category;
  payday: Date;
  assetHistory: AssetHistoryItem[];
  createdAt: Date;
  updatedAt: Date;
  uid?: string; // This is the primary key
  dividend?: number;
}
