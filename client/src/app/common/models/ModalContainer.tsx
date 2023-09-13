import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import { Modal } from "semantic-ui-react";

function ModalContainer() {
  const { modelStore } = useStore();
  return (
    <Modal
      open={modelStore.model.open}
      onClose={modelStore.closeModel}
      size="mini"
    >
      <Modal.Content>{modelStore.model.body}</Modal.Content>
    </Modal>
  );
}

export default observer(ModalContainer);
