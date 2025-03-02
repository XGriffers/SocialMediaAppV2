import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

const ShareModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? "#363537" : "#ccc"}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <PostShare />
    </Modal>
  );
};

export default ShareModal;