import {
  Modal,
  Stack,
  Text,
  TreeNodeData,
  UseTreeReturnType,
} from "@mantine/core";
import { EntitySelectModalContent } from "@/components/ui/Modals/EntitySelectModal/EntitySelectModalContent";

interface IProps {
  tree: UseTreeReturnType;
  data: TreeNodeData[];
  title: string;
  opened: boolean;
  handleClose: () => void;
  isMobile?: boolean;
  actionButton?: React.ReactNode;
}

export function EntitySelectModal({
  opened,
  handleClose,
  isMobile,
  title,
  data,
  tree,
  actionButton = null,
}: IProps) {
  return (
    <Modal
      centered
      fullScreen={isMobile}
      opened={opened}
      onClose={handleClose}
      title={<Text fw={700}>{title}</Text>}
      styles={{
        body: {
          height: isMobile ? "calc(100vh - 60px)" : "70vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack style={{ flex: 1, minHeight: 0 }}>
        <EntitySelectModalContent
          actionButton={actionButton}
          data={data}
          tree={tree}
          closeModal={handleClose}
        />
      </Stack>
    </Modal>
  );
}
