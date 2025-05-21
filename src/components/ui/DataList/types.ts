export interface IDataListItem<T> {
  id: string;
  primaryText: string;
  secondaryText?: string;
  leftIcon?: React.ReactNode;
  data: T;
}
