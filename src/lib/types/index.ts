import { PropsWithChildren } from "react";

export interface WithClassName {
  className?: string;
}

export type WithChildrenAndClassName = PropsWithChildren & WithClassName;

export interface PropsWithClassName {
  className?: string;
}

export type PropsWithChildrenAndClassName<T> = PropsWithChildren<
  T & PropsWithClassName
>;
