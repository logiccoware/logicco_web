"use client";

import {
  Alert,
  Tree,
  type TreeNodeData,
  type UseTreeReturnType,
} from "@mantine/core";
import classes from "@/components/ui/Modals/EntitySelectModal/EntitySelectModalContent/EntityTreeView/EntityTreeVIew.module.css";
import { EntityTreeViewData } from "@/components/ui/Modals/EntitySelectModal/EntitySelectModalContent/EntityTreeView/EntityTreeViewData";
import { useTranslations } from "next-intl";

interface IProps {
  tree: UseTreeReturnType;
  data: TreeNodeData[];
}

export function EntityTreeView({ data, tree }: IProps) {
  const t = useTranslations("Common.modals.entitySelect");
  if (data.length === 0) {
    return (
      <Alert mt='xl' variant="light" color="blue">
        {t("noEntityFoundMessage")}
      </Alert>
    );
  }

  return (
    <Tree
      tree={tree}
      classNames={classes}
      data={data}
      renderNode={(payload) => <EntityTreeViewData {...payload} />}
    />
  );
}
