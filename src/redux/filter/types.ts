export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type TSortValues = {
  name: string;
  sortProperty: SortPropertyEnum;
};
export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortValues: TSortValues;
  pageCurrent: number;
  sortOrder: boolean;
}
