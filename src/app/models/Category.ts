export interface Category {
  id?: number;
  name: string;
  description?: string;
  parentCategoryId?: number;
  subCategoryIds?: number[];
  level?: number;
  productIds?: number[];
}
