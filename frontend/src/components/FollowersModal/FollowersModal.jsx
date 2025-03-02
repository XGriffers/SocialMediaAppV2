import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  console.log("modal poppin", modalOpened);
  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? "#363537" : "#ccc"}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="35%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <FollowersCard location="modal" />
    </Modal>
  );
};

export default FollowersModal;