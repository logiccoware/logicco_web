import { PropsWithChildren, ReactNode } from "react";

type MenuListItemProps = {
    leading: string | ReactNode;
    trailing: ReactNode;
}

export function ListMenuItem({ leading, trailing }: MenuListItemProps) {
  return (
    <div className="flex border border-gray-400 rounded-lg p-2 justify-between items-center my-4">
      <div>{leading}</div>
      <div>{trailing}</div>
    </div>
  );
}
