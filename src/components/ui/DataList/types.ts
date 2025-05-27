export interface IDataListItem<T> {
  id: string;
  primaryText: string;
  secondaryText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  data: T;
}
