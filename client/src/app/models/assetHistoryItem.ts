export interface AssetHistoryItem {
  price: number;
  date: Date;
  uid?: string; // This is the primary key
  assetUid?: string; // This is a foreign key
}
