import { SortListItem } from '../../components/Sort';

export interface IParams {
  categoryUrl: string;
  ascOrDescUrl: string;
  searchUrl: string;
  pageCurrent: number;
  sortValues: SortListItem;
}

export type PizzaItems = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  typesPizza: number[];
  id: string;
  rating: number;
};

// Специальный объект со значениями
export enum StatusEnum {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItems[];
  status: StatusEnum;
}
